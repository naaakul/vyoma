"use client";

import { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { CreateKeyModal } from "./create-key-modal";
import { revokeApiKeyAction } from "./actions";

type ApiKeyRow = {
  id: string;
  name: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
  createdBy?: string | null; 
  lastUsedAt?: Date | null;  
  preview?: string | null; 
};

export default function KeysClient({ keys }: { keys: ApiKeyRow[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopy = async (val: string) => {
    await navigator.clipboard.writeText(val);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">API KEYS</h1>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-semibold text-white">LIVE</span>
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">0 CONCURRENT SANDBOXES</span>
            </div>

            <button className="text-gray-400 hover:text-white transition-colors p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 015.646 5.646 9.001 9.001 0 0020.354 15.354z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="border border-gray-800 rounded-lg p-8">
          {/* Section header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold mb-2">MANAGE API KEYS</h2>
              <p className="text-gray-500 text-sm max-w-md">
                API Keys are used to authenticate API requests from your teams applications.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span className="text-lg">+</span> CREATE KEY
            </button>
          </div>

          {/* Table */}
          {keys.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No API keys yet. Create one to get started.</p>
            </div>
          ) : (
            <div className="border border-gray-800 rounded overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-4 gap-6 px-6 py-4 border-b border-gray-800 bg-gray-950">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">KEY</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">LAST USED</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CREATED BY</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CREATED AT</div>
              </div>

              {/* Body */}
              {keys.map((k) => (
                <div
                  key={k.id}
                  className="border-b border-gray-800 last:border-b-0 hover:bg-gray-950 transition-colors"
                >
                  <div className="grid grid-cols-4 gap-6 px-6 py-6 items-start">
                    {/* Key */}
                    <div>
                      <div className="font-semibold text-white mb-1">{k.name}</div>

                      <div className="text-sm text-gray-500 font-mono mb-2">
                        {k.preview ?? "••••••••••••••••••"}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleCopy(k.preview ?? k.name)}
                          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>

                        <form action={revokeApiKeyAction}>
                          <input type="hidden" name="id" value={k.id} />
                          <button
                            type="submit"
                            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Revoke
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Last Used */}
                    <div className="text-sm text-gray-400">
                      {k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleDateString() : "Never"}
                    </div>

                    {/* Created By */}
                    <div className="text-sm text-gray-400">{k.createdBy ?? "—"}</div>

                    {/* Created At */}
                    <div className="text-sm text-gray-400">
                      {new Date(k.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateKeyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
