import { PaymentProvider } from "../provider";
import { paypalRequest } from "@/lib/paypal/client";

export class PayPalProvider implements PaymentProvider {
  async createOrder(amount: number, currency: string) {
  const order = await paypalRequest<any>("POST", "/v2/checkout/orders", {
  intent: "CAPTURE",
  application_context: {
    return_url: "http://localhost:3000/paypal/return",
    cancel_url: "http://localhost:3000/paypal/cancel",
    landing_page: "LOGIN",
    user_action: "PAY_NOW",
  },
  purchase_units: [
    {
      amount: {
        currency_code: currency,
        value: amount.toFixed(2),
      },
    },
  ],
});


  const approvalLink = order.links.find(
    (l: any) => l.rel === "approve"
  )?.href;

  if (!approvalLink) {
    throw new Error("No PayPal approval link returned");
  }

  return {
    orderId: order.id,
    approvalLink,
  };
}


  async captureOrder(orderId: string) {
    return paypalRequest<any>(
      "POST",
      `/v2/checkout/orders/${orderId}/capture`
    );
  }
}
