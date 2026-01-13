"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Sandbox = {
  id: string;
  template: string;
  status: "running" | "stopped";
  startedAt: string;
  lastHeartbeatAt: string;
};

export default function SandboxListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "running" | "stopped">("all");
  const [sandboxes, setSandboxes] = useState<Sandbox[]>([]);

  async function fetchSandboxes() {
    const qs =
      status === "all" ? "" : `?status=${status}`;
    const res = await fetch(`/api/sandboxes${qs}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setSandboxes(data);
  }

  useEffect(() => {
    fetchSandboxes();
    const interval = setInterval(fetchSandboxes, 7000);
    return () => clearInterval(interval);
  }, [status]);

  const filtered = sandboxes.filter(
    (s) =>
      s.id.includes(search) ||
      s.template.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex flex-col gap-8 bg-background p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sandboxes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Active sandbox instances
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          ← Back to Monitoring
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Search by Sandbox ID or Template..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {["all", "running", "stopped"].map((s) => (
            <Button
              key={s}
              variant={status === s ? "default" : "outline"}
              onClick={() => setStatus(s as any)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sandbox ID</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Started At</TableHead>
              <TableHead>Last Heartbeat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((sb) => (
              <TableRow key={sb.id}>
                <TableCell className="font-mono text-sm">
                  {sb.id}
                </TableCell>
                <TableCell>{sb.template}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      sb.status === "running"
                        ? "bg-green-900/30 text-green-300"
                        : "bg-gray-700/30 text-gray-300"
                    }
                  >
                    {sb.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(sb.startedAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(sb.lastHeartbeatAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center">
                  No sandboxes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
