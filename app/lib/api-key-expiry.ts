export const API_KEY_EXPIRY_OPTIONS = {
  "1w": {
    label: "1 week",
    ms: 7 * 24 * 60 * 60 * 1000,
  },
  "1m": {
    label: "1 month",
    ms: 30 * 24 * 60 * 60 * 1000,
  },
  "1y": {
    label: "1 year",
    ms: 365 * 24 * 60 * 60 * 1000,
  },
} as const;

export type ApiKeyExpiryOption = keyof typeof API_KEY_EXPIRY_OPTIONS;

export function computeExpiry(option: ApiKeyExpiryOption) {
  return new Date(Date.now() + API_KEY_EXPIRY_OPTIONS[option].ms);
}
