import { NextResponse } from "next/server";
import { verifyPaypalWebhook } from "@/lib/paypal/verifyWebhook";

export async function POST(req: Request) {
  const body = await req.json();
  const isValid = await verifyPaypalWebhook(body, req.headers);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  const eventType = body.event_type;

  switch (eventType) {
    case "PAYMENT.CAPTURE.COMPLETED": {
      const capture = body.resource;
      const captureId = capture.id;
      const amount = capture.amount.value;

      // TODO:
      // - mark payment as paid in DB
      // - grant credits / unlock feature
      // - ensure idempotency (captureId unique)

      break;
    }

    case "PAYMENT.CAPTURE.DENIED":
    case "PAYMENT.CAPTURE.FAILED": {
      // handle failure
      break;
    }
  }

  return NextResponse.json({ ok: true });
}
