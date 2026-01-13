import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") ?? "5m";

  let windowMs = 5 * 60 * 1000;
  let bucketMs = 10 * 1000;

  if (range === "1h") {
    windowMs = 60 * 60 * 1000;
    bucketMs = 60 * 1000;
  }
  if (range === "24h") {
    windowMs = 24 * 60 * 60 * 1000;
    bucketMs = 10 * 60 * 1000;
  }

  const since = new Date(Date.now() - windowMs);

  const events = await prisma.sandboxEvent.findMany({
    where: {
      type: { in: ["SANDBOX_STARTED", "SANDBOX_STOPPED"] },
      timestamp: { gte: since },
    },
    orderBy: { timestamp: "asc" },
  });

  let current = 0;
  let idx = 0;
  const buckets: { t: number; v: number }[] = [];

  for (
    let t = since.getTime();
    t <= Date.now();
    t += bucketMs
  ) {
    while (idx < events.length && events[idx].timestamp.getTime() <= t) {
      if (events[idx].type === "SANDBOX_STARTED") current++;
      if (events[idx].type === "SANDBOX_STOPPED") current--;
      idx++;
    }

    buckets.push({ t, v: Math.max(current, 0) });
  }

  return NextResponse.json(buckets);
}
