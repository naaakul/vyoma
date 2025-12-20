export const runtime = "nodejs";
import { auth } from "@/utils/auth-helpers";
import { toNextJsHandler } from "better-auth/next-js";
 
export const { POST, GET } = toNextJsHandler(auth.handler);

console.log("DB:", process.env.DATABASE_URL);
