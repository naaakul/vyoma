import { prisma } from "@/lib/prisma";
import { callSandboxd } from "@/lib/sandboxd";
import { authenticateApiKey } from "@/lib/auth/apiKey";

export async function POST(req: Request) {
  try {
    const user = await authenticateApiKey(req);

    const body = await req.json();
    const { sandboxId } = body;

    if (!sandboxId) {
      return Response.json(
        { error: "sandboxId is required" },
        { status: 400 }
      );
    }

    const sandbox = await prisma.sandbox.findUnique({
      where: { id: sandboxId },
    });

    if (!sandbox) {
      return Response.json(
        { error: "Sandbox not found" },
        { status: 404 }
      );
    }

    if (sandbox.userId !== user.id) {
      return Response.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    if (sandbox.status === "stopped") {
      return Response.json({
        sandboxId,
        status: "stopped",
      });
    }

    try {
      const res = await callSandboxd("/sandbox/stop", { sandboxId });
      if (!res.ok) {
      }
    } catch {
    }

    await prisma.sandbox.update({
      where: { id: sandboxId },
      data: {
        status: "stopped",
        stoppedAt: new Date(),
      },
    });

    return Response.json({
      sandboxId,
      status: "stopped",
    });
  } catch (err) {
    console.error("STOP_FATAL_ERROR", err);
    return Response.json(
      { error: "Failed to stop sandbox" },
      { status: 500 }
    );
  }
}
