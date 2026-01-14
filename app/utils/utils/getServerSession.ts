import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";

export async function getServerSession() {
  const h = await headers(); 
  return auth.api.getSession({ headers: h });
}
