import type { ReactNode } from "react"
import type { Metadata } from "next"

import { DocsHeader } from "@/components/docs/header"
import { DocsSidebar } from "@/components/docs/sidebar"
import { TableOfContents } from "@/components/docs/table-of-contents"

export const metadata: Metadata = {
  title: "Vyoma Documentation",
  description:
    "Official documentation for Vyoma – secure, isolated sandboxes for code execution.",
}

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DocsHeader />

      <div className="flex">
        <DocsSidebar />

        <main className="relative flex-1 md:ml-64">
          <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14 mt-16">
            {children}
          </div>

          {/* Right-side table of contents */}
          {/* <TableOfContents /> */}
        </main>
      </div>
    </div>
  )
}
