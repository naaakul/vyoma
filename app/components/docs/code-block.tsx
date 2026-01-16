"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  language: string
  code: string
  filename?: string
}

export function CodeBlock({
  language,
  code,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silently fail – clipboard may be unavailable
    }
  }

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-border bg-slate-950 dark:bg-slate-900">
      {filename && (
        <div className="flex items-center justify-between border-b border-border bg-slate-900 px-4 py-2 text-xs font-mono text-slate-300">
          <span>{filename}</span>
        </div>
      )}

      <pre className="overflow-x-auto p-4 text-sm">
        <code
          className={`language-${language} font-mono text-slate-100`}
        >
          {code}
        </code>
      </pre>

      <Button
        size="icon"
        variant="ghost"
        aria-label="Copy code"
        onClick={handleCopy}
        className="absolute right-2 top-2 h-8 w-8"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
