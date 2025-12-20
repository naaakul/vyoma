import { Hono } from "hono";
import { createSandbox, stopSandbox } from "../sandbox.js";

export const sandboxRoute = new Hono();

sandboxRoute.post("/", async (c) => {
  const sandbox = await createSandbox();
  return c.json(sandbox);
});

sandboxRoute.post("/:id/stop", async (c) => {
  const id = c.req.param("id");
  await stopSandbox(id);
  return c.json({ stopped: true });
});
