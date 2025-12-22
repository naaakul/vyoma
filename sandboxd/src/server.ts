import { Hono } from "hono";
import { serve } from "@hono/node-server";

import {
  startSandbox,
  stopSandbox,
  writeFile,
  execCommand,
  sandboxStatus,
} from "./sandbox";

const app = new Hono();

app.post("/sandbox/run", async (c) => {
  const { sandboxId, image, port } = await c.req.json();
  if (!sandboxId || !image || !port) {
    return c.json({ error: "missing fields" }, 400);
  }

  const result = await startSandbox(sandboxId, image, port);
  return c.json({ sandboxId, ...result });
});

app.post("/sandbox/stop", async (c) => {
  const { sandboxId } = await c.req.json();
  await stopSandbox(sandboxId);
  return c.json({ ok: true });
});

app.post("/sandbox/write", async (c) => {
  const { sandboxId, path, content } = await c.req.json();
  await writeFile(sandboxId, path, content);
  return c.json({ ok: true });
});

app.post("/sandbox/exec", async (c) => {
  const { sandboxId, command, cwd } = await c.req.json();
  const output = await execCommand(sandboxId, command, cwd);
  return c.json({ output });
});

app.get("/sandbox/status/:id", async (c) => {
  const id = c.req.param("id");
  const status = await sandboxStatus(id);
  return c.json({ status });
});

const PORT = Number(process.env.PORT) || 4000;

serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`sandboxd listening on port ${PORT}`);
