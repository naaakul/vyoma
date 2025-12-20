import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/utils/auth-helpers";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="border rounded-xl p-6 space-y-4 text-center">
          <h1 className="text-2xl font-semibold">Vyoma</h1>

          <Link
            href="/auth/sign-in"
            className="inline-block px-4 py-2 rounded-lg bg-black text-white"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="border rounded-xl p-6 space-y-4 w-full max-w-sm">
        <div>
          <h2 className="text-lg font-semibold">
            {session.user.name ?? "User"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {session.user.email}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/dashboard/keys" className="border rounded-lg px-4 py-2 text-center">
            API Keys
          </Link>

          <Link href="/dashboard/credit" className="border rounded-lg px-4 py-2 text-center">
            Credits
          </Link>
        </div>
      </div>
    </main>
  );
}
