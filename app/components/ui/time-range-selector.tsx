"use client"

import { useState } from "react"

type TimeRange = "5m" | "1h" | "24h"

interface TimeRangeSelectorProps {
  onSelect: (range: TimeRange) => void
  defaultRange?: TimeRange
}

export function TimeRangeSelector({ onSelect, defaultRange = "5m" }: TimeRangeSelectorProps) {
  const [selected, setSelected] = useState<TimeRange>(defaultRange)

  const ranges: TimeRange[] = ["5m", "1h", "24h"]

  const handleSelect = (range: TimeRange) => {
    setSelected(range)
    onSelect(range)
  }

  return (
    <div className="flex gap-2">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => handleSelect(range)}
          className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
            selected === range ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  )
}
