import { NextResponse } from "next/server";
import { capturePaypalPayment } from "@/lib/payments/payment.service";

export async function POST(req: Request) {
  const { orderId } = await req.json();

  const result = await capturePaypalPayment(orderId);

  return NextResponse.json(result);
}
