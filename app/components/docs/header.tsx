import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">
            Vyoma
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/your-org/vyoma"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            GitHub
          </a>

          <Button asChild size="sm">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
