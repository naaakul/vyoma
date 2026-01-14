import { authenticateApiKey } from "@/lib/auth/apiKey";
import { CREATE_COST } from "@/lib/billing/constants";
import { recordUsage } from "@/lib/billing/recordUsage";
import { callSandboxd } from "@/lib/sandboxd";
import { prisma } from "@/utils/auth-helpers";

export async function POST(req: Request) {
  try {
    console.log("CREATE: request received");

    const user = await authenticateApiKey(req);
    console.log("CREATE: user", user.id);

    const body = await req.json();
    console.log("CREATE: body", body);

    const { templateId, timeout } = body;

    if (!templateId) {
      return Response.json(
        { error: "template is required" },
        { status: 400 }
      );
    }

    if (user.credits.toNumber() <= 0) {
      return Response.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    const sandbox = await prisma.sandbox.create({
      data: {
        userId: user.id,
        template: templateId,
        status: "creating",
        lastHeartbeatAt: new Date(),
      },
    });

    const res = await callSandboxd("/sandbox/run", {
      sandboxId: sandbox.id,
      image: templateId,
      port: 3000,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`sandboxd failed: ${res.status} ${text}`);
    }

    await prisma.sandbox.update({
      where: { id: sandbox.id },
      data: { status: "running" },
    });

    await recordUsage({
      userId: user.id,
      sandboxId: sandbox.id,
      cost: CREATE_COST,
      reason: "sandbox.create",
    });

    return Response.json({ sandboxId: sandbox.id });
  } catch (err: any) {
    console.error("CREATE_SANDBOX_FATAL_ERROR");
    console.error(err);
    console.error(err?.stack);

    return new Response("CREATE FAILED", { status: 500 });
  }
}
