import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import { revalidatePath } from "next/cache";

export default async function KeysPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const keys = await prisma.apiKey.findMany({
    where: {
      userId: session.user.id,
      revokedAt: null,
    },
    orderBy: { createdAt: "desc" },
  });

  async function revokeKey(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;

    await prisma.apiKey.update({
      where: { id },
      data: { revokedAt: new Date() },
    });

    revalidatePath("/dashboard/keys");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">API Keys</h1>

      {/* CREATE KEY FORM */}
      <form
        action={async (formData) => {
          "use server";

          await fetch("http://localhost:3000/api/keys", {
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

          revalidatePath("/dashboard/keys");
        }}
        className="flex gap-2"
      >
        <input
          name="name"
          placeholder="Key name"
          className="border rounded px-3 py-2 w-full"
          required
        />

        <select
          name="expiry"
          className="border rounded px-3 py-2"
          required
        >
          {[
            { v: "1w", d: 7 },
            { v: "1m", d: 30 },
            { v: "1y", d: 365 },
          ].map((opt) => {
            const expires = new Date(Date.now() + opt.d * 86400000);
            return (
              <option key={opt.v} value={opt.v}>
                {opt.v === "1w"
                  ? "1 week"
                  : opt.v === "1m"
                  ? "1 month"
                  : "1 year"}{" "}
                (expires {expires.toDateString()})
              </option>
            );
          })}
        </select>

        <button className="border rounded px-4 py-2">Create</button>
      </form>

      {/* KEYS LIST */}
      <div className="border rounded-xl divide-y">
        {keys.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">
            No API keys yet.
          </div>
        )}

        {keys.map((key) => {
          const isExpired = key.expiresAt < new Date();

          return (
            <div
              key={key.id}
              className="p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{key.name}</div>

                <div className="text-xs text-muted-foreground">
                  Created {key.createdAt.toDateString()} • Expires{" "}
                  {key.expiresAt.toDateString()}
                  {isExpired && (
                    <span className="ml-2 text-red-600 font-medium">
                      (Expired)
                    </span>
                  )}
                </div>
              </div>

              <form action={revokeKey}>
                <input type="hidden" name="id" value={key.id} />
                <button
                  type="submit"
                  className="text-sm text-red-600 hover:underline"
                >
                  Revoke
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
