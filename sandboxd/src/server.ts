import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { sandboxRoute } from "./routes/sandbox.js";

const app = new Hono();

app.get("/health", (c) => c.json({ ok: true }));

app.route("/sandboxes", sandboxRoute);

serve({
  fetch: app.fetch,
  port: 3001,
});

console.log("sandboxd running on http://localhost:3001");
