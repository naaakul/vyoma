import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import KeysClient from "./keys-client";

export const dynamic = "force-dynamic";

export default async function KeysPage() {
  const h = await headers();

  const session = await auth.api.getSession({
    headers: h,
  });

  if (!session?.user) throw new Error("Unauthorized");

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/keys/list`, {
    headers: {
      cookie: h.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  const keys = await res.json();
  return <KeysClient initialKeys={keys} />;
}
