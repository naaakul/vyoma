import { prisma } from "@/lib/prisma";
import { callSandboxd } from "@/lib/sandboxd";
import { recordUsage } from "@/lib/billing/recordUsage";
import { WRITE_COST } from "@/lib/billing/constants";
import { authenticateApiKey } from "@/lib/auth/apiKey";

export async function POST(req: Request) {
  const user = await authenticateApiKey(req);
  const body = await req.json();

  const { sandboxId, path, content } = body;

  if (!sandboxId || !path || content === undefined) {
    return Response.json(
      { error: "sandboxId, path, and content are required" },
      { status: 400 }
    );
  }

  const sandbox = await prisma.sandbox.findUnique({
    where: { id: sandboxId },
  });

  if (!sandbox) {
    return Response.json({ error: "Sandbox not found" }, { status: 404 });
  }

  if (sandbox.userId !== user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  if (sandbox.status !== "running") {
    return Response.json(
      { error: "Sandbox is not running" },
      { status: 409 }
    );
  }

  if (user.credits.toNumber() <= 0) {
    return Response.json(
      { error: "Insufficient credits" },
      { status: 402 }
    );
  }

  try {
    const res = await callSandboxd("/write", {
      sandboxId,
      path,
      content,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "sandboxd write failed");
    }
  } catch {
    return Response.json(
      { error: "File write failed" },
      { status: 500 }
    );
  }

  await recordUsage({
    userId: user.id,
    sandboxId,
    cost: WRITE_COST,
    reason: "sandbox.write",
  });

  const updatedUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { credits: true },
  });

  if (updatedUser && updatedUser.credits.toNumber() <= 0) {
    try {
      await callSandboxd("/stop", { sandboxId });
      await prisma.sandbox.update({
        where: { id: sandboxId },
        data: {
          status: "stopped",
          stoppedAt: new Date(),
        },
      });
    } catch {
    }
  }

  return Response.json({
    success: true,
  });
}
