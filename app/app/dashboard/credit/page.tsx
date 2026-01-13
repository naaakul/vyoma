import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import { prisma } from "@/lib/prisma";
import CreditClient from "./credit-client";

export default async function CreditPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true, email: true },
  });

  return (
    <CreditClient
      credits={Number(user?.credits ?? 0)}
      email={user?.email ?? ""}
    />
  );
}
