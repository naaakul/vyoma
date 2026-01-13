"use client";

import { useState } from "react";
import { Moon } from "lucide-react";

export default function CreditClient({
  credits,
  email,
}: {
  credits: number;
  email: string;
}) {
  const [budgetLimit, setBudgetLimit] = useState("");
  const [budgetAlert, setBudgetAlert] = useState("");

  // currently UI only — later wire to actions/api
  const handleSetBudgetLimit = () => {
    if (!budgetLimit) return;
    alert(`Budget limit set to $${budgetLimit}`);
  };

  const handleSetAlert = () => {
    if (!budgetAlert) return;
    alert(`Budget alert set to $${budgetAlert}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-8 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">BUDGET</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm font-medium">LIVE</span>
            </div>
            <div className="text-gray-400 text-sm">
              0 <span className="text-gray-600">CONCURRENT SANDBOXES</span>
            </div>
            <button className="p-2 hover:bg-gray-900 rounded transition-colors">
              <Moon size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-12">
        <div className="space-y-8 max-w-6xl">
          {/* Credits */}
          <div className="border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-2">CREDITS</h2>
            <p className="text-gray-400 text-sm mb-6">
              Your current credits balance.
              <br />
              Usage costs are deducted from your credits.
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-yellow-500 text-3xl">$</span>
              <span className="text-5xl font-bold">{credits.toFixed(2)}</span>
            </div>
          </div>

          {/* Budget Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Enable Budget Limit */}
            <div className="border border-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6">ENABLE BUDGET LIMIT</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-yellow-500 block mb-2">
                    $ [USD]
                  </label>

                  <div className="flex gap-2">
                    <div className="flex items-center border border-gray-700 rounded bg-gray-950">
                      <button
                        type="button"
                        className="px-3 py-2 text-gray-400 hover:text-white"
                        onClick={() =>
                          setBudgetLimit(String(Math.max(0, Number(budgetLimit || 0) + 1)))
                        }
                      >
                        ▲
                      </button>

                      <input
                        type="number"
                        value={budgetLimit}
                        onChange={(e) => setBudgetLimit(e.target.value)}
                        className="w-24 bg-transparent px-2 py-2 text-white outline-none"
                        placeholder="0"
                      />

                      <button
                        type="button"
                        className="px-3 py-2 text-gray-400 hover:text-white"
                        onClick={() =>
                          setBudgetLimit(String(Math.max(0, Number(budgetLimit || 0) - 1)))
                        }
                      >
                        ▼
                      </button>
                    </div>

                    <button
                      onClick={handleSetBudgetLimit}
                      className="bg-white text-black hover:bg-gray-200 font-bold px-6 py-2 rounded"
                    >
                      SET
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mt-6">
                  If your team exceeds this threshold in a given billing period,
                  subsequent API requests will be blocked.
                  <br />
                  You will automatically receive email notifications when your
                  usage reaches <span className="font-bold">50%, 80%, 90%</span>,
                  and <span className="font-bold">100%</span> of this limit.
                </p>

                <div className="mt-6 p-4 bg-gray-950 border border-red-900 rounded">
                  <p className="text-sm text-red-500">
                    <span className="font-bold">Caution:</span> Enabling a budget
                    limit may cause interruptions to your service. Once your{" "}
                    <span className="font-bold">Budget Limit</span> is reached,
                    your team will not be able to create new sandboxes in the
                    given billing period unless the limit is increased.
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Alert */}
            <div className="border border-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6">SET A BUDGET ALERT</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-yellow-500 block mb-2">
                    $ [USD]
                  </label>

                  <div className="flex gap-2">
                    <div className="flex items-center border border-gray-700 rounded bg-gray-950">
                      <button
                        type="button"
                        className="px-3 py-2 text-gray-400 hover:text-white"
                        onClick={() =>
                          setBudgetAlert(String(Math.max(0, Number(budgetAlert || 0) + 1)))
                        }
                      >
                        ▲
                      </button>

                      <input
                        type="number"
                        value={budgetAlert}
                        onChange={(e) => setBudgetAlert(e.target.value)}
                        className="w-24 bg-transparent px-2 py-2 text-white outline-none"
                        placeholder="0"
                      />

                      <button
                        type="button"
                        className="px-3 py-2 text-gray-400 hover:text-white"
                        onClick={() =>
                          setBudgetAlert(String(Math.max(0, Number(budgetAlert || 0) - 1)))
                        }
                      >
                        ▼
                      </button>
                    </div>

                    <button
                      onClick={handleSetAlert}
                      className="bg-white text-black hover:bg-gray-200 font-bold px-6 py-2 rounded"
                    >
                      SET
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed mt-6">
                  If your team exceeds this threshold in a given month, you'll
                  receive an alert notification to{" "}
                  <span className="font-bold">{email || "your email"}</span>.
                  This will not result in any interruptions to your service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
