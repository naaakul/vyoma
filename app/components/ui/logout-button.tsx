"use client"

import { Button } from "@/components/ui/button"
import { useCallback } from "react"

export function LogoutButton() {
  const handleLogout = useCallback(async () => {
    try {
      console.log("Logout initiated")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }, [])

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="border-2 border-red-800 dark:border-red-800 hover:bg-muted bg-transparent text-red-800 hover:text-red-800"
    >
      Logout
    </Button>
  )
}
