"use server";

import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import { revalidatePath } from "next/cache";

export async function createApiKeyAction(formData: FormData) {
  const res = await fetch("http://localhost:3000/api/keys", {
    method: "POST",
    headers: {
      Cookie: (await headers()).get("cookie")!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("name"),
      expiry: formData.get("expiry"),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to create key");
  }

  revalidatePath("/dashboard/keys");
}

export async function revokeApiKeyAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Unauthorized");

  const id = String(formData.get("id") || "");

  await prisma.apiKey.update({
    where: { id },
    data: { revokedAt: new Date() },
  });

  revalidatePath("/dashboard/keys");
}
