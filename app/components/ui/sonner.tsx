"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      closeButton
      toastOptions={{
        style: {
          background: "#000000",
          color: "#ffffff",
          border: "1px solid #262626",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
