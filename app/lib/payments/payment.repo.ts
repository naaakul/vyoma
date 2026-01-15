import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type CreatePaymentInput = {
  userId: string;
  provider: string;
  orderId: string;

  amount: Prisma.Decimal;
  currency: string;

  creditsGranted: Prisma.Decimal;
};

export async function createPayment(data: CreatePaymentInput) {
  return prisma.payment.create({
    data: {
      provider: data.provider,
      orderId: data.orderId,
      amount: data.amount,
      currency: data.currency,
      status: "created",

      creditsGranted: data.creditsGranted,
      user: {
        connect: { id: data.userId },
      },
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
