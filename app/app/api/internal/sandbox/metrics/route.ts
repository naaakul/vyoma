import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySignature } from "@/lib/internal/verifySignature";

export async function POST(req: NextRequest) {
  const isValid = await verifySignature(req);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(await req.text());

  const { sandboxId, cpu, memory, disk, timestamp } = body;

  await prisma.sandboxMetric.create({
    data: {
      sandboxId,
      cpu,
      memory,
      disk,
      timestamp: new Date(timestamp),
    },
  });

  await prisma.sandbox.update({
    where: { id: sandboxId },
    data: {
      startedAt: new Date(timestamp),
    },
  });

  return NextResponse.json({ ok: true });
}
