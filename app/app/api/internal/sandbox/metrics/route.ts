import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySignature } from "@/lib/internal/verifySignature";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  const isValid = verifySignature(rawBody, signature);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody);
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
      lastHeartbeatAt: new Date(timestamp),
    },
  });

  return NextResponse.json({ ok: true });
}
