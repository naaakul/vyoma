"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { KPICard } from "@/components/ui/kpi-card";
import { ChartLine } from "@/components/ui/chart-line";
import { TimeRangeSelector } from "@/components/ui/time-range-selector";
import { LiveBadge } from "@/components/ui/live-badge";

type Summary = {
  concurrent: number;
  startRatePerSec: number;
  peakConcurrent: number;
  limit: number;
  lastUpdatedAt: number;
};

export default function MonitorPage() {
  const [range, setRange] = useState<"5m" | "1h" | "24h">("5m");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [series, setSeries] = useState<{ time: string; value: number }[]>([]);
  const [isLive, setIsLive] = useState(false);

  async function fetchSummary() {
    const res = await fetch("/api/dashboard/summary", { cache: "no-store" });
    const data = await res.json();
    setSummary(data);
    setIsLive(Date.now() - data.lastUpdatedAt < 10_000);
  }

  async function fetchSeries(r: string) {
    const res = await fetch(`/api/dashboard/timeseries?range=${r}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setSeries(
      data.map((d: any) => ({
        time: new Date(d.t).toLocaleTimeString(),
        value: d.v,
      }))
    );
  }

  useEffect(() => {
    fetchSummary();
    fetchSeries(range);

    const interval = setInterval(() => {
      fetchSummary();
      fetchSeries(range);
    }, 7000);

    return () => clearInterval(interval);
  }, [range]);

  if (!summary) return null;

  return (
    <main className="flex flex-col gap-8 bg-background p-8">
      {/* Header */}
      <div className="flex items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Monitoring</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sandbox infrastructure overview
          </p>
        </div>
        
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          label="Concurrent Sandboxes"
          value={summary.concurrent}
          subtext="Live"
        />
        <KPICard
          label="Start Rate"
          value={`${summary.startRatePerSec.toFixed(2)}/sec`}
          subtext="Last 60s"
        />
        <KPICard
          label="Peak Concurrency"
          value={summary.peakConcurrent}
          subtext="Last 30 days"
        />
        <KPICard
          label="Sandbox Limit"
          value={`${summary.concurrent} / ${summary.limit}`}
          subtext="Usage"
        />
      </div>

      {/* Live Badge */}
      <div className="flex items-center gap-2">
        <LiveBadge isLive={isLive} />
      </div>

      {/* Chart */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Concurrent Sandboxes Over Time
          </h2>
          <TimeRangeSelector onSelect={setRange} />
        </div>
        <ChartLine data={series} title="Concurrent Sandboxes Over Time" />
      </div>
    </main>
  );
}
