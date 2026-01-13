import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySignature } from "@/lib/internal/verifySignature";

export async function POST(req: NextRequest) {
  const isValid = await verifySignature(req);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(await req.text());

  const { sandboxId, type, timestamp, template } = body;

  await prisma.sandboxEvent.create({
    data: {
      sandboxId,
      type,
      payload: body,
      timestamp: new Date(timestamp),
    },
  });

  if (type === "SANDBOX_STARTED") {
    await prisma.sandbox.upsert({
      where: { id: sandboxId },
      update: {
        status: "running",
        startedAt: new Date(timestamp),
      },
      create: {
        id: sandboxId,
        template,
        status: "running",
        startedAt: new Date(timestamp),
        userId: body.userId,
      },
    });
  }

  if (type === "SANDBOX_STOPPED") {
    await prisma.sandbox.update({
      where: { id: sandboxId },
      data: {
        status: "stopped",
        stoppedAt: new Date(timestamp),
      },
    });
  }

  return NextResponse.json({ ok: true });
}
