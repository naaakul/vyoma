import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import KeysClient from "./keys-client";

export default async function KeysPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const keys = await prisma.apiKey.findMany({
    where: {
      userId: session.user.id,
      revokedAt: null,
    },
    orderBy: { createdAt: "desc" },
  });

  return <KeysClient keys={keys} />;
}
