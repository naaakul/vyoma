import { paypalRequest } from "./client";

export async function verifyPaypalWebhook(body: any, headers: Headers) {
  const verification = await paypalRequest<any>(
    "POST",
    "/v1/notifications/verify-webhook-signature",
    {
      auth_algo: headers.get("paypal-auth-algo"),
      cert_url: headers.get("paypal-cert-url"),
      transmission_id: headers.get("paypal-transmission-id"),
      transmission_sig: headers.get("paypal-transmission-sig"),
      transmission_time: headers.get("paypal-transmission-time"),
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: body,
    }
  );

  return verification.verification_status === "SUCCESS";
}
