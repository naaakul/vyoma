import { NextResponse } from "next/server";
import { createPaypalPayment } from "@/lib/payments/payment.service";

export async function POST(req: Request) {
  const { amount, currency = "USD" } = await req.json();

  const payment = await createPaypalPayment(amount, currency);

  return NextResponse.json(payment);
}

