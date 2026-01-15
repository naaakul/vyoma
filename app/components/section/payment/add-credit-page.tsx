"use client"

import { useState } from "react"
import { CreditBalanceCard } from "./credit-balance-card"
import { CreditAmountInput } from "./credit-amount-input"
import { PaymentMethodSelector } from "./payment-method-selector"
import { PayPalPayment } from "./paypal/paypal-payment"
import { RazorpayPayment } from "./razorpay/razorpay-payment"

type PaymentMethod = "paypal" | "razorpay"

export default function AddCreditPage() {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal")

  const derivedCredits = amount ? parseInt(amount, 10) : 0
  const isValidAmount = derivedCredits >= 1

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Add Credits</h1>
          <p className="text-sm text-muted-foreground mt-1">
            1 USD = 1 Credit
          </p>
        </div>

        <CreditBalanceCard balance={120} />

        <CreditAmountInput
          amount={amount}
          onAmountChange={setAmount}
          derivedCredits={derivedCredits}
        />

        <PaymentMethodSelector
          selectedMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
        />

        {paymentMethod === "paypal" && (
          <PayPalPayment
            amount={derivedCredits}
            isDisabled={!isValidAmount}
          />
        )}

        {paymentMethod === "razorpay" && (
          <RazorpayPayment
            amount={derivedCredits}
            isDisabled={!isValidAmount}
          />
        )}
      </div>
    </main>
  )
}
