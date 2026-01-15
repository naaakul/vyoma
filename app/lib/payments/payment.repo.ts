import { prisma } from "@/lib/prisma";

export async function createPayment(data: {
  provider: string;
  orderId: string;
  amount: number;
  currency: string;
}) {
  return prisma.payment.create({
    data: {
      provider: data.provider,
      orderId: data.orderId,
      amount: data.amount,
      currency: data.currency,
      status: "created",
    },
  });
}

export async function markPaymentCaptured(
  orderId: string,
  captureId: string,
  rawPayload: any
) {
  return prisma.payment.update({
    where: { orderId },
    data: {
      status: "captured",
      captureId,
      rawPayload,
    },
  });
}

export async function markPaymentFailed(orderId: string, rawPayload: any) {
  return prisma.payment.update({
    where: { orderId },
    data: {
      status: "failed",
      rawPayload,
    },
  });
}
