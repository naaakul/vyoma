# Vyoma SDK

Official JavaScript / TypeScript SDK for **Vyoma** — a developer platform for creating, managing, and controlling isolated development sandboxes programmatically.

The SDK is fully typed, lightweight, and designed to work cleanly with modern Node.js and TypeScript environments.

---

## Installation

npm install vyoma

---

## Quick Start

Minimum working example to verify installation and SDK behavior.

import { VyomaClient } from "vyoma";

const vyoma = new VyomaClient({
  apiKey: process.env.VYOMA_API_KEY!,
});

// Create a sandbox
const sandbox = await vyoma.sandbox.create({
  templateId: "nextjs-preview",
  timeout: 600,
});

console.log(sandbox.sandboxId, sandbox.url);

If this runs and you get autocomplete, the SDK is working correctly.

---

## Configuration

VyomaClient

new VyomaClient({
  apiKey: string;        // required
  baseUrl?: string;      // optional, defaults to Vyoma API
});

Example:

const vyoma = new VyomaClient({
  apiKey: "vk_live_xxx",
});

---

## Sandbox API

Create Sandbox

Creates a new sandbox instance.

const sandbox = await vyoma.sandbox.create({
  templateId: "nextjs-preview",
  timeout: 600,
});

console.log(sandbox.sandboxId);
console.log(sandbox.url);

---

Stop Sandbox

Stops an active sandbox.

await vyoma.sandbox.stop("sandbox_id");

---

Get Sandbox Status

Fetches the current sandbox state.

const status = await vyoma.sandbox.status("sandbox_id");

console.log(status.status);

---

Write File

Writes content into a sandbox file.

await vyoma.sandbox.write(
  "sandbox_id",
  "/app/page.tsx",
  "export default function Page() { return <div>Hello</div>; }"
);

---

Execute Command

Runs a shell command inside the sandbox.

const result = await vyoma.sandbox.exec(
  "sandbox_id",
  "npm install"
);

console.log(result.stdout);
console.log(result.stderr);

---

## Type Safety

The Vyoma SDK is fully typed.

All request payloads and responses are strict TypeScript contracts aligned with SDK runtime behavior.
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