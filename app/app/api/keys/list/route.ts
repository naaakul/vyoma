import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const keys = await prisma.apiKey.findMany({
    where: {
      userId: session.user.id,
      revokedAt: null,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      expiresAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(keys);
}
