import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/utils/auth-helpers";
import { Card, CardContent } from "@/components/ui/card";

export default async function CreditsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true, email: true },
  });

  const credits = Number(user?.credits ?? 0);

  return (
    <main className="flex flex-col gap-8 bg-background p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Credits</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Usage and billing overview
        </p>
      </div>

      {/* Balance */}
      <div className="rounded-lg border border-border bg-background p-8">
        <p className="text-sm text-muted-foreground">Current Balance</p>
        <p className="mt-2 text-5xl font-bold text-foreground">
          {credits.toLocaleString()}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          {user?.email}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Current Balance</p>
            <p className="text-2xl font-semibold">{credits.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Usage This Month</p>
            <p className="text-2xl font-semibold">—</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Estimated Remaining</p>
            <p className="text-2xl font-semibold">—</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-xs text-muted-foreground border-t border-border pt-6">
        Credits reset monthly. Usage metrics update in near real time.
      </div>
    </main>
  );
}
