"use client";

import * as React from "react";
import { X } from "lucide-react";
import { createApiKeyAction } from "./actions";

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateKeyModal({ isOpen, onClose }: CreateKeyModalProps) {
  const [error, setError] = React.useState("");
  const [pending, startTransition] = React.useTransition();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-950 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">
              Create API Key
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <form
            action={(formData) => {
              setError("");
              startTransition(async () => {
                try {
                  await createApiKeyAction(formData);
                  onClose();
                } catch (e) {
                  setError(
                    e instanceof Error ? e.message : "Something went wrong"
                  );
                }
              });
            }}
            className="p-6 space-y-5"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Key Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="e.g., Production API"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Give your key a descriptive name
              </p>
            </div>

            {/* Expiry */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Expires In
              </label>
              <select
                name="expiry"
                defaultValue="1m"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded text-white focus:border-gray-600 focus:outline-none transition-colors"
              >
                <option value="1w">1 week</option>
                <option value="1m">1 month</option>
                <option value="1y">1 year</option>
                <option value="never">Never expires</option>
              </select>
            </div>

            {error ? (
              <div className="p-3 bg-red-950 border border-red-800 rounded text-sm text-red-200">
                {error}
              </div>
            ) : null}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-700 rounded text-gray-300 hover:bg-gray-900 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="flex-1 px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {pending ? "Creating..." : "Create Key"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
