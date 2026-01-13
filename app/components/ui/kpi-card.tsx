interface KPICardProps {
  label: string
  value: string | number
  subtext: string
  trend?: "up" | "down" | "neutral"
}

export function KPICard({ label, value, subtext, trend = "neutral" }: KPICardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground">{value}</span>
          {trend === "up" && <span className="text-xs text-green-500">↑</span>}
          {trend === "down" && <span className="text-xs text-red-500">↓</span>}
        </div>
        <p className="text-xs text-muted-foreground">{subtext}</p>
      </div>
    </div>
  )
}
