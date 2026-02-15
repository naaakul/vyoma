"use client";

import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const INSTALL_COMMAND = "npm i vyoma";

export default function CopyInstallCommand() {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      toast.success("Copied");
    } catch {
      toast.error("Unable to copy");
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleCopy}
            className="relative group cursor-pointer"
            aria-label="Copy install command"
          >
            <div className="absolute inset-0 border border-dashed border-neutral-400 rounded-md bg-black backdrop-blur-xs" />
            <div className="relative px-6 py-3 font-mono text-sm md:text-base text-neutral-200 flex items-center gap-2">
              <span>{INSTALL_COMMAND}</span>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white">Copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
