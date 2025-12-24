import { authenticateApiKey } from "@/lib/auth/apiKey";
import { CREATE_COST } from "@/lib/billing/constants";
import { recordUsage } from "@/lib/billing/recordUsage";
import { callSandboxd } from "@/lib/sandboxd";
import { prisma } from "@/utils/auth-helpers";

export async function POST(req: Request) {
  const user = await authenticateApiKey(req);
  const body = await req.json();

  if (user.credits.toNumber() <= 0) {
    return Response.json({ error: "Insufficient credits" }, { status: 402 });
  }

  const sandbox = await prisma.sandbox.create({
    data: {
      userId: user.id,
      template: body.template,
      status: "creating",
    },
  });

  try {
    const res = await callSandboxd("/create", {
      sandboxId: sandbox.id,
      template: body.template,
      timeout: body.timeout,
    });

    if (!res.ok) throw new Error("sandboxd failed");

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
  } catch {
    await prisma.sandbox.delete({ where: { id: sandbox.id } });
    throw new Response("Sandbox creation failed", { status: 500 });
  }
}
