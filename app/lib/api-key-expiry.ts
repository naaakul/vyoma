export const API_KEY_EXPIRY_OPTIONS = {
  "7d": {
    label: "7 days",
    ms: 7 * 24 * 60 * 60 * 1000,
  },
  "30d": {
    label: "30 days",
    ms: 30 * 24 * 60 * 60 * 1000,
  },
  "90d": {
    label: "90 days",
    ms: 90 * 24 * 60 * 60 * 1000,
  },
  "never": {
    label: "Never",
    ms: null,
  },
} as const;

export type ApiKeyExpiryOption = keyof typeof API_KEY_EXPIRY_OPTIONS;

export function computeExpiry(option: ApiKeyExpiryOption) {
  if (option === "never") {
    return new Date("9999-12-31T23:59:59.999Z");
  }

  return new Date(Date.now() + API_KEY_EXPIRY_OPTIONS[option].ms);
}
