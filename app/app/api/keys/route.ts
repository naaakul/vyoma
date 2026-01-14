import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateApiKey, hashApiKey } from "@/lib/api-key";
import { API_KEY_EXPIRY_OPTIONS, computeExpiry } from "@/lib/api-key-expiry";
import { getServerSession } from "@/utils/getServerSession";

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, expiry } = await req.json();

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  if (!expiry || !(expiry in API_KEY_EXPIRY_OPTIONS)) {
    return NextResponse.json({ error: "Invalid expiry option" }, { status: 400 });
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
  const keyHash = hashApiKey(plainKey);
  const expiresAt = computeExpiry(expiry);

  await prisma.apiKey.create({
    data: {
      name,
      keyHash,
      userId: user.id,
      expiresAt,
    },
  });

  return NextResponse.json({
    key: plainKey,
    expiresAt,
  });
}