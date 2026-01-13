import crypto from "crypto";

export function verifySignature(rawBody: string, signature: string | null) {
  if (!signature) return false;

  const expected = crypto
    .createHmac("sha256", process.env.SANDBOX_SHARED_SECRET!)
    .update(rawBody)
    .digest("hex");

  return signature === expected;
}
