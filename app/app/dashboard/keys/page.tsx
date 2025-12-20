import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import { revalidatePath } from "next/cache";

export default async function KeysPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const keys = await prisma.apiKey.findMany({
    where: {
      userId: session!.user.id,
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

      <form
        action={async (formData) => {
          "use server";
          await fetch("http://localhost:3000/api/keys", {
            method: "POST",
            headers: {
              Cookie: (await headers()).get("cookie")!,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: formData.get("name") }),
          });
        }}
        className="flex gap-2"
      >
        <input
          name="name"
          placeholder="Key name"
          className="border rounded px-3 py-2 w-full"
          required
        />
        <button className="border rounded px-4 py-2">
          Create
        </button>
      </form>

      <div className="border rounded-xl divide-y">
        {keys.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">
            No API keys yet.
          </div>
        )}

        {keys.map((key) => (
          <div
            key={key.id}
            className="p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{key.name}</div>
              <div className="text-xs text-muted-foreground">
                Created {key.createdAt.toDateString()}
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
        ))}
      </div>
    </div>
  );
}
