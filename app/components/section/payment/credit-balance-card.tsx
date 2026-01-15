import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CreditBalanceCardProps {
  balance: number
}

export function CreditBalanceCard({ balance }: CreditBalanceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground">{balance}</span>
          <span className="text-lg text-muted-foreground">Credits</span>
        </div>
      </CardContent>
    </Card>
  )
}
