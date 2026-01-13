import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const now = Date.now();

  const concurrent = await prisma.sandbox.count({
    where: { status: "running" },
  });

  const startedLastMinute = await prisma.sandboxEvent.count({
    where: {
      type: "SANDBOX_STARTED",
      timestamp: {
        gte: new Date(now - 60_000),
      },
    },
  });

  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const peak = await prisma.sandbox.count({
    where: {
      startedAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  return NextResponse.json({
    concurrent,
    startRatePerSec: startedLastMinute / 60,
    peakConcurrent: peak,
    limit: 20,
    lastUpdatedAt: now,
  });
}
