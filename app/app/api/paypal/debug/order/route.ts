import { NextResponse } from "next/server";
import { paypalRequest } from "@/lib/paypal/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "orderId required" }, { status: 400 });
  }

  const order = await paypalRequest<any>(
    "GET",
    `/v2/checkout/orders/${orderId}`
  );

  return NextResponse.json(order);
}
