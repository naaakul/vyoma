"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "@/lib/auth/auth-client";

export default function SignUpPage() {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);
  // const [open, setOpen] = useState(false);
  
    const handleOAuth = async (provider: "google" | "github") => {
      await signIn.social(
        {
          provider,
          callbackURL: "/",
        },
        {
          onRequest: () => setLoading(provider),
          onResponse: () => {
            setLoading(null);
            // setOpen(false);
          },
        }
      );
    };

  return (
    <div className="max-w-sm w-full px-4 py-6">
      <h2 className="text-lg mb-1">Sign up</h2>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
        Sign up to your account using your preferred provider
      </p>

      <div className="space-y-2 mb-4">
        <button
          disabled={loading !== null}
          onClick={() => handleOAuth("google")}
          className="flex w-full border-2 border-neutral-800 cursor-pointer bg-neutral-900 font-medium rounded-lg py-3 items-center justify-center gap-3"
        >
          {loading === "google" ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <Image
                src={"/google.svg"}
                alt={"logo"}
                height={200}
                width={200}
                className="w-5"
              ></Image>
            </>
          )}
          <p className="font-medium">Sign in with Google</p>
        </button>

        <button
          disabled={loading !== null}
          onClick={() => handleOAuth("github")}
          className="flex w-full border-2 border-neutral-800 cursor-pointer bg-neutral-900 font-medium rounded-lg py-3 items-center justify-center gap-3"
        >
          {loading === "github" ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <Image
                src={"/git.svg"}
                alt={"logo"}
                height={200}
                width={200}
                className="w-5"
              ></Image>
            </>
          )}
          <p className="font-medium">Sign in with GitHub</p>
        </button>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-6">
        By continuing, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-2 hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy-policy"
          className="underline underline-offset-2 hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          Privacy Policy
        </Link>
      </p>

      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-black dark:text-white hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
