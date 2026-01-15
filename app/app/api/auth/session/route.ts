import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return NextResponse.json(session);
}
