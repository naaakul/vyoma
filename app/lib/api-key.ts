import crypto from "crypto";

export function generateApiKey() {
  return `nak_${crypto.randomBytes(24).toString("hex")}`;
}

export function hashApiKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export function maskApiKey(key: string) {
  return `${key.slice(0, 12)}****${key.slice(-4)}`;
}
