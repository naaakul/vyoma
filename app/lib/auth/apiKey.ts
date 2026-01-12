import { hashApiKey } from "@/lib/api-key";
import { prisma } from "@/utils/auth-helpers";

export async function authenticateApiKey(req: Request) {
  const header = req.headers.get("authorization");

  if (!header?.startsWith("Bearer ")) {
    throw new Response("Missing API key", { status: 401 });
  }

  const rawKey = header.slice(7);
  const hash = hashApiKey(rawKey);

  const apiKey = await prisma.apiKey.findUnique({
    where: { keyHash: hash },
    include: { user: true },
  });

  if (!apiKey || apiKey.revokedAt) {
    throw new Response("Invalid API key", { status: 403 });
  }

  if (apiKey.expiresAt < new Date()) {
    throw new Response("API key expired", { status: 401 });
  }

  await prisma.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  });

  return apiKey.user;
}
