"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

type State = "loading" | "success" | "error"

export default function PayPalReturnPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("token")
  const [state, setState] = useState<State>("loading")

  useEffect(() => {
    if (!orderId) {
      setState("error")
      return
    }

    const capture = async () => {
      try {
        const res = await fetch("/api/payments/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        })

        if (!res.ok) throw new Error("Capture failed")

        setState("success")
        setTimeout(() => router.push("/add-credit"), 2000)
      } catch {
        setState("error")
      }
    }

    capture()
  }, [orderId, router])

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 text-center space-y-4">
          {state === "loading" && (
            <>
              <Loader2 className="mx-auto h-6 w-6 animate-spin" />
              <p>Finalizing payment…</p>
            </>
          )}

          {state === "success" && (
            <>
              <CheckCircle2 className="mx-auto h-6 w-6 text-green-600" />
              <p className="font-semibold">Payment successful</p>
              <p className="text-sm text-muted-foreground">
                Credits will be added shortly
              </p>
            </>
          )}

          {state === "error" && (
            <>
              <AlertCircle className="mx-auto h-6 w-6 text-red-600" />
              <p className="font-semibold">Payment failed</p>
              <p className="text-sm text-muted-foreground">
                Please contact support
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
