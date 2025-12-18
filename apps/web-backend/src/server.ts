// apps/api/src/server.ts
import { serve } from "@hono/node-server";
import app from "./index";

serve({
  fetch: app.fetch,
  port: 3001,
});
