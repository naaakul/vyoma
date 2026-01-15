import { Suspense } from "react"
import PayPalReturnClient from "./paypal-return-client"

export default function PayPalReturnPage() {
  return (
    <Suspense fallback={<PayPalReturnLoading />}>
      <PayPalReturnClient />
    </Suspense>
  )
}

function PayPalReturnLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border bg-card p-8 text-center space-y-4">
        <div className="mx-auto h-6 w-6 rounded-full border animate-spin" />
        <p>Finalizing payment…</p>
      </div>
    </main>
  )
}
