import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

interface RazorpayPaymentProps {
  amount: number
  isDisabled: boolean
}

export function RazorpayPayment({ amount, isDisabled }: RazorpayPaymentProps) {
  return (
    <Card className="opacity-60">
      <CardHeader>
        <CardTitle className="text-base">Razorpay</CardTitle>
        <CardDescription>Fast and secure payments with Razorpay</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>Razorpay integration coming next. Please use PayPal for now.</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
