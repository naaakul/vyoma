"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ApiKey = {
  id: string;
  name: string;
  maskedKey: string;
  createdAt: string;
  expiresAt: string;
};

const EXPIRY_OPTIONS = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "never", label: "Never" },
];

export default function KeysClient({ initialKeys }: { initialKeys: ApiKey[] }) {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState<string>("30d");
  const [open, setOpen] = useState(false);

  const [createdKey, setCreatedKey] = useState<string | null>(null);

  async function revokeKey(id: string) {
    await fetch("/api/keys/revoke", {
      method: "POST",
      body: JSON.stringify({ id }),
    });

    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  async function createKey() {
    const res = await fetch("/api/keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, expiry }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error ?? "Failed to create key");
      return;
    }

    const data = await res.json();
    setCreatedKey(data.key);

    const listRes = await fetch("/api/keys/list");
    // console.log("fetch runs ⭐⭐")
    const freshKeys = await listRes.json();
    setKeys(freshKeys);
    // console.log("KEYSSSS => ",freshKeys)

    setName("");
    setExpiry("30d");
  }

  function copy(value: string) {
    navigator.clipboard.writeText(value);
  }

  return (
    <main className="flex flex-col gap-8 bg-background p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-sm text-muted-foreground">
            Manage and rotate your API keys
          </p>
        </div>

        {/* Create Key */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Create New Key</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
            </DialogHeader>

            {createdKey ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This key is shown <strong>only once</strong>. Copy it now.
                </p>
                <div className="rounded border border-border bg-muted p-3 font-mono text-xs break-all">
                  {createdKey}
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => copy(createdKey)}>Copy Key</Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setCreatedKey(null);
                      setOpen(false);
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Key name (e.g. Production)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Select value={expiry} onValueChange={setExpiry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiry" />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPIRY_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={createKey} disabled={!name || !expiry}>
                  Create Key
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              {/* <TableHead>Key</TableHead> */}
              <TableHead>Created</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {keys.map((k) => (
              <TableRow key={k.id}>
                <TableCell>{k.name}</TableCell>
                {/* <TableCell className="font-mono text-sm text-muted-foreground">
                  {k.maskedKey}
                </TableCell> */}
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(k.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {(() => {
                    const formatted = new Date(k.expiresAt).toLocaleString();
                    return formatted === "1/1/10000, 5:29:59 AM"
                      ? "never"
                      : formatted;
                  })()}
                  {/* {({new Date(k.expiresAt).toLocaleString()} == "1/1/10000, 5:29:59 AM") ? "never" : {new Date(k.expiresAt).toLocaleString()}} */}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => revokeKey(k.id)}
                  >
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {keys.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  No API keys found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
