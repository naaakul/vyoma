"use client";

import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      console.log("Logout initiated");

      await authClient.signOut({
        fetchOptions: {
          credentials: "include",
        },
      });

      router.refresh();
      router.push("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [router]);

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="border-2 border-red-800 dark:border-red-800 hover:bg-muted bg-transparent text-red-800 hover:text-red-800"
    >
      Logout
    </Button>
  );
}
