import { prisma } from "@/lib/prisma";
import { authenticateApiKey } from "@/lib/auth/apiKey";
import { callSandboxd } from "@/lib/sandboxd";
import { recordUsage } from "@/lib/billing/recordUsage";
import { EXEC_COST } from "@/lib/billing/constants";

export async function POST(req: Request) {
  const user = await authenticateApiKey(req);
  const body = await req.json();

  const { sandboxId, command, cwd } = body;

  if (!sandboxId || !command) {
    return Response.json(
      { error: "sandboxId and command are required" },
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
    return Response.json({ error: "Sandbox is not running" }, { status: 409 });
  }

  if (user.credits.toNumber() <= 0) {
    return Response.json({ error: "Insufficient credits" }, { status: 402 });
  }

  let result;
  try {
    const res = await callSandboxd("/exec", {
      sandboxId,
      command,
      cwd,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "sandboxd exec failed");
    }

    result = await res.json();
  } catch (err) {
    return Response.json(
      { error: "Command execution failed" },
      { status: 500 }
    );
  }

  await recordUsage({
    userId: user.id,
    sandboxId,
    cost: EXEC_COST,
    reason: "sandbox.exec",
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
    } catch {}
  }

  return Response.json({
    output: result.output,
    exitCode: result.exitCode,
  });
}
