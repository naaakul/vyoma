"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreditAmountInputProps {
  amount: string
  onAmountChange: (value: string) => void
  derivedCredits: number
}

export function CreditAmountInput({ amount, onAmountChange, derivedCredits }: CreditAmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      onAmountChange(value)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Enter Amount</CardTitle>
        <CardDescription>Amount in USD (minimum $1)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium">
            Amount (USD)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="amount"
              type="text"
              placeholder="0"
              value={amount}
              onChange={handleChange}
              className="pl-7"
              inputMode="numeric"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Credits Preview */}
        {amount && (
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">You will receive</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{derivedCredits} Credits</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
