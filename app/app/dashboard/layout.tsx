import type { ReactNode } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "@/utils/getServerSession";

const navItems = [
  { href: "/dashboard/profile", label: "profile" },
  { href: "/dashboard/keys", label: "API Keys" },
  { href: "/dashboard/sandboxes", label: "Sandboxes" },
  { href: "/dashboard/monitor", label: "Monitoring" },
  { href: "/dashboard/credits", label: "Credits" },
];

async function getPathnameFromHeader() {
  const h = await headers();
  return h.get("x-pathname") ?? "";
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();
  if (!session?.user) redirect("/auth/sign-in");
  // const pathname = (await headers()).get("x-pathname") ?? "";

  const pathname = await getPathnameFromHeader();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-background">
        <div className="flex flex-col gap-8 p-6">
          {/* Branding */}
          <div className="text-sm font-semibold text-foreground flex gap-2.5 items-center">
            <Image
              alt=""
              src={"/logo.svg"}
              height={200}
              width={200}
              className="size-[1.2rem]"
            ></Image>
            <p>Vyoma Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
