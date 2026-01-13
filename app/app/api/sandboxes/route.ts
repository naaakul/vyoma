import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || "";

  const sandboxes = await prisma.sandbox.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(search
        ? {
            id: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {}),
    },
    orderBy: { startedAt: "desc" },
  });

  return NextResponse.json(sandboxes);
}
