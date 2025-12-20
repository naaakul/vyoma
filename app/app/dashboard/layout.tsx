import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen p-6">
      {children}
    </main>
  );
}
