import { NextResponse } from "next/server"
import { createPaypalPayment } from "@/lib/payments/payment.service"
import { getServerSession } from "@/utils/getServerSession"

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { amount, currency = "USD" } = await req.json()

  if (!amount || amount < 1) {
    return NextResponse.json(
      { error: "Invalid amount" },
      { status: 400 }
    )
  }

  const payment = await createPaypalPayment(
    session.user.id, // 🔥 THIS IS THE KEY FIX
    amount,
    currency
  )

  return NextResponse.json(payment)
}
