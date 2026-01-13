"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconKey,
  IconCoins,
  IconSettings,
  IconArrowLeft,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Credits",
      href: "/dashboard/credit",
      icon: (
        <IconCoins className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "API Keys",
      href: "/dashboard/keys",
      icon: (
        <IconKey className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "flex min-h-screen w-full overflow-hidden border border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-900"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    ...link,
                    // optional: highlight active page
                    label: (
                      <span
                        className={cn(
                          "transition",
                          pathname === link.href && "font-semibold"
                        )}
                      >
                        {link.label}
                      </span>
                    ) as any,
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Nakul",
                href: "/dashboard/profile",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* MAIN CONTENT */}
      <main className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col border border-neutral-200 bg-white p-4 md:p-10 dark:border-neutral-700 dark:bg-neutral-950">
          {children}
        </div>
      </main>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-black dark:text-white"
      >
        Vyoma
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};
