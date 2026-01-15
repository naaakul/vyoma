import { PayPalProvider } from "./providers/paypal.provider";
import {
  createPayment,
  markPaymentCaptured,
  markPaymentFailed,
} from "./payment.repo";

const paypal = new PayPalProvider();

export async function createPaypalPayment(
  amount: number,
  currency: string
) {
  const { orderId, approvalLink } =
    await paypal.createOrder(amount, currency);

  await createPayment({
    provider: "paypal",
    orderId,
    amount,
    currency,
  });

  return { orderId, approvalLink };
}

export async function capturePaypalPayment(orderId: string) {
  try {
    return await paypal.captureOrder(orderId);
  } catch (err) {
    await markPaymentFailed(orderId, err);
    throw err;
  }
}
