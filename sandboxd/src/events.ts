import fetch from "node-fetch";
import crypto from "crypto";

const INTERNAL_BACKEND_URL = process.env.INTERNAL_BACKEND_URL!;
const SHARED_SECRET = process.env.SANDBOX_SHARED_SECRET!;

function sign(body: string) {
  return crypto
    .createHmac("sha256", SHARED_SECRET)
    .update(body)
    .digest("hex");
}

export async function emitEvent(event: any) {
  const body = JSON.stringify(event);
  await fetch(`${INTERNAL_BACKEND_URL}/internal/sandbox/event`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-signature": sign(body),
    },
    body,
  });
}

export async function emitMetrics(metrics: any) {
  const body = JSON.stringify(metrics);
  await fetch(`${INTERNAL_BACKEND_URL}/internal/sandbox/metrics`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-signature": sign(body),
    },
    body,
  });
}
