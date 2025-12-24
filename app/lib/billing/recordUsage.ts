import { prisma } from "@/lib/prisma";

export async function recordUsage({
  userId,
  sandboxId,
  cost,
  reason,
}: {
  userId: string;
  sandboxId?: string;
  cost: number;
  reason: string;
}) {
  if (cost <= 0) return;

  await prisma.$transaction([
    prisma.usageEvent.create({
      data: {
        userId,
        sandboxId,
        cost,
        reason,
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: cost,
        },
      },
    }),
  ]);
}
