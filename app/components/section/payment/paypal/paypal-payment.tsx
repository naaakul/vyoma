"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PayPalPaymentProps {
  amount: number
  isDisabled: boolean
}

type PaymentState = "idle" | "loading" | "error"

export function PayPalPayment({ amount, isDisabled }: PayPalPaymentProps) {
  const [state, setState] = useState<PaymentState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handlePayPalPayment = async () => {
    setState("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/payments/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      })

      if (!res.ok) throw new Error("Failed to create PayPal order")

      const { approvalLink } = await res.json()

      if (!approvalLink) throw new Error("Approval link missing")

      window.location.href = approvalLink
    } catch (err) {
      setState("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">PayPal</CardTitle>
        <CardDescription>Secure payment using PayPal</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {state === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Button
          size="lg"
          className="w-full"
          disabled={isDisabled || state === "loading"}
          onClick={handlePayPalPayment}
        >
          {state === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Pay with PayPal
        </Button>
      </CardContent>
    </Card>
  )
}
