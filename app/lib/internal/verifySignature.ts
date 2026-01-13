import crypto from "crypto";
import { NextRequest } from "next/server";

export async function verifySignature(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  if (!signature) return false;

  const body = await req.text();

  const expected = crypto
    .createHmac("sha256", process.env.SANDBOX_SHARED_SECRET!)
    .update(body)
    .digest("hex");

  return signature === expected;
}
