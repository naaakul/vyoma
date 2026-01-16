import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getServerSession } from "@/utils/getServerSession"

export default async function CreditsPage() {
  const session = await getServerSession()

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      credits: true,
      email: true,
    },
  })

  const payments = await prisma.payment.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      provider: true,
      amount: true,
      currency: true,
      creditsGranted: true,
      status: true,
      createdAt: true,
    },
  })

  const credits = Number(user?.credits ?? 0)

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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground">Current Balance</p>
            <p className="text-2xl font-semibold">
              {credits.toLocaleString()}
            </p>
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
            <p className="text-xs text-muted-foreground">
              Estimated Remaining
            </p>
            <p className="text-2xl font-semibold">—</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Payment History
          </h2>
          <p className="text-sm text-muted-foreground">
            All credit purchases and their status
          </p>
        </div>

        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-sm text-muted-foreground"
                  >
                    No payments yet
                  </TableCell>
                </TableRow>
              )}

              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="text-sm">
                    {payment.createdAt.toLocaleDateString()}
                  </TableCell>

                  <TableCell className="capitalize">
                    {payment.provider}
                  </TableCell>

                  <TableCell>
                    {payment.currency}{" "}
                    {Number(payment.amount).toFixed(2)}
                  </TableCell>

                  <TableCell>
                    {Number(payment.creditsGranted)}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "captured"
                          ? "default"
                          : payment.status === "failed"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="text-xs text-muted-foreground border-t border-border pt-6">
        Credits reset monthly. Usage metrics update in near real time.
      </div>
    </main>
  )
}
