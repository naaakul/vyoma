import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPaypalWebhook } from "@/lib/paypal/verifyWebhook"

export async function POST(req: Request) {
  const body = await req.json()
  const isValid = await verifyPaypalWebhook(body, req.headers)

  if (!isValid) {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 })
  }

  if (body.event_type !== "PAYMENT.CAPTURE.COMPLETED") {
    return NextResponse.json({ ok: true })
  }

  const capture = body.resource
  const captureId = capture.id
  const orderId =
    capture.supplementary_data?.related_ids?.order_id

  if (!orderId) return NextResponse.json({ ok: true })

  const payment = await prisma.payment.findUnique({
    where: { orderId },
  })

  if (!payment || payment.status === "captured") {
    return NextResponse.json({ ok: true })
  }

  await prisma.$transaction([
    prisma.payment.update({
      where: { orderId },
      data: {
        status: "captured",
        captureId,
        rawPayload: body,
      },
    }),
    prisma.user.update({
      where: { id: payment.userId },
      data: {
        credits: {
          increment: payment.creditsGranted,
        },
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}
