# Vyoma SDK

Official JavaScript / TypeScript SDK for **Vyoma** — a developer platform for creating, managing, and controlling isolated development sandboxes programmatically.

The SDK is fully typed, lightweight, and designed to work cleanly with modern Node.js and TypeScript environments.

---

## Installation

```bash
npm install vyoma
```

---

## Quick Start

This is the minimum working example to verify the SDK is installed and usable.

```ts
import { VyomaClient } from "vyoma";

const vyoma = new VyomaClient({
  apiKey: process.env.VYOMA_API_KEY!,
});

// Create a sandbox
const { sandbox } = await vyoma.sandbox.create({
  templateId: "nextjs-preview",
  timeout: 600,
});

console.log(sandbox.id, sandbox.status);
```

If this runs and you get autocomplete, the SDK is working correctly.

---

## Configuration

### VyomaClient

```ts
new VyomaClient({
  apiKey: string;        // required
  baseUrl?: string;     // optional, defaults to Vyoma API
});
```

Example:

```ts
const vyoma = new VyomaClient({
  apiKey: "vk_live_xxx",
});
```

---

## Sandbox API

### Create Sandbox

```ts
const response = await vyoma.sandbox.create({
  templateId: "nextjs-preview",
  timeout: 600,
});
```

### Stop Sandbox

```ts
await vyoma.sandbox.stop("sandbox_id");
```

### Get Sandbox Status

```ts
const status = await vyoma.sandbox.status("sandbox_id");
```

---

## Type Safety

The Vyoma SDK is fully typed.

All request payloads and responses are strict TypeScript contracts that mirror the Vyoma API.
This enables autocomplete, compile-time validation, and safe refactoring.

---

## Runtime Support

- Node.js 18+
- Bun
- Deno (npm compatibility)
- Vite
- Next.js (App Router & Pages Router)

---

## Versioning

The SDK follows semantic versioning.

- 0.x → early development
- Breaking changes may occur before 1.0.0

---

## License

MIT © Vyoma
