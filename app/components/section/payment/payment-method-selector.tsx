"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PaymentMethodSelectorProps {
  selectedMethod: "paypal" | "razorpay"
  onMethodChange: (method: "paypal" | "razorpay") => void
}

export function PaymentMethodSelector({ selectedMethod, onMethodChange }: PaymentMethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedMethod} onValueChange={(value) => onMethodChange(value as "paypal" | "razorpay")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paypal">PayPal</TabsTrigger>
            <TabsTrigger value="razorpay">Razorpay</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}
