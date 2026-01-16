import type { ReactNode } from "react"
import { AlertCircle, CheckCircle, Info } from "lucide-react"

import { cn } from "@/lib/utils"

type CalloutType = "info" | "warning" | "success"

interface CalloutProps {
  type: CalloutType
  title?: string
  children: ReactNode
}

const icons: Record<CalloutType, React.ComponentType<any>> = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle,
}

const styles: Record<CalloutType, string> = {
  info:
    "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100",
  success:
    "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
}

export function Callout({ type, title, children }: CalloutProps) {
  const Icon = icons[type]

  return (
    <div
      className={cn(
        "my-6 rounded-lg border px-4 py-3",
        styles[type]
      )}
    >
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />

        <div className="space-y-1">
          {title && (
            <h4 className="font-semibold leading-none">
              {title}
            </h4>
          )}

          <div className="text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
