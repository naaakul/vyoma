import crypto from "crypto";

type ApiKeyEnv = "live" | "test";

export function generateApiKey(env: ApiKeyEnv = "live") {
  const random = crypto.randomBytes(24).toString("hex");
  return `vy_${env}_${random}`;
}

export function hashApiKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export function maskApiKey(key: string) {
  const prefixEnd = key.indexOf("_", key.indexOf("_") + 1) + 1;
  return `${key.slice(0, prefixEnd + 8)}****${key.slice(-4)}`;
}
