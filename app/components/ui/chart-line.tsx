"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartLineProps {
  data: Array<{ time: string; value: number }>
  title: string
  valueLabel?: string
}

export function ChartLine({ data, title, valueLabel = "Value" }: ChartLineProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" vertical={false} />
          <XAxis dataKey="time" stroke="hsl(var(--color-muted-foreground))" style={{ fontSize: "12px" }} />
          <YAxis stroke="hsl(var(--color-muted-foreground))" style={{ fontSize: "12px" }} />
          <Tooltip
          
            contentStyle={{
              backgroundColor: "hsl(var(--color-card))",
              border: "1px solid hsl(var(--color-border))",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "hsl(var(--color-foreground))" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--color-chart-2))"
            isAnimationActive={true}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
