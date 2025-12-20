import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import { prisma } from "@/lib/prisma";

export default async function CreditPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    select: { credits: true },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Credits</h1>
        <p className="text-sm text-muted-foreground">
          Credits are deducted when you create or resume sandboxes.
        </p>
      </div>

      <div className="border rounded-xl p-6">
        <div className="text-sm text-muted-foreground">Available balance</div>
        <div className="text-4xl font-bold">
          ${user?.credits.toString()}
        </div>
      </div>
    </div>
  );
}
