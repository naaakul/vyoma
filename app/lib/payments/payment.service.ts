import { PayPalProvider } from "./providers/paypal.provider";
import {
  createPayment,
  markPaymentCaptured,
  markPaymentFailed,
} from "./payment.repo";
import { prisma } from "../prisma";

const paypal = new PayPalProvider();

export async function createPaypalPayment(
  userId: string,
  amount: number,
  currency: string
) {
  const { orderId, approvalLink } =
    await paypal.createOrder(amount, currency)

  await prisma.payment.create({
    data: {
      userId,
      provider: "paypal",
      orderId,
      amount,
      currency,
      creditsGranted: amount, 
      status: "created",
    },
  })

  return { orderId, approvalLink }
}


export async function capturePaypalPayment(orderId: string) {
  try {
    return await paypal.captureOrder(orderId);
  } catch (err) {
    await markPaymentFailed(orderId, err);
    throw err;
  }
}
