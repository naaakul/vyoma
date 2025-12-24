import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import { prisma } from "@/lib/prisma";
import { generateApiKey, hashApiKey } from "@/lib/api-key";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, credits: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.credits.toNumber() <= 0) {
    return NextResponse.json(
      { error: "Insufficient credits" },
      { status: 402 }
    );
  }

  const plainKey = generateApiKey();
  console.log(plainKey)
  const keyHash = hashApiKey(plainKey);

  await prisma.apiKey.create({
    data: {
      name,
      keyHash,
      userId: user.id,
    },
  });

  return NextResponse.json({
    key: plainKey, 
  });
}

