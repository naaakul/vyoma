"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: 2 | 3
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]")
    )

    const mapped: Heading[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: el.tagName === "H2" ? 2 : 3,
    }))

    setHeadings(mapped)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-96px 0px -60%",
        threshold: 0.1,
      }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block fixed right-0 top-16 h-[calc(100vh-64px)] w-64 overflow-y-auto px-6 py-8 text-sm">
      <h4 className="mb-4 font-semibold text-foreground/70">
        On this page
      </h4>

      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block transition-colors text-foreground/60 hover:text-foreground",
              heading.level === 3 && "ml-4",
              activeId === heading.id &&
                "text-primary font-medium"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  )
}
