import { headers } from "next/headers";
import { auth } from "@/utils/auth-helpers";
import KeysClient from "./keys-client";

export default async function KeysPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Unauthorized");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/keys/list`,
    {
      headers: {
        cookie: (await headers()).get("cookie") ?? "",
      },
      cache: "no-store",
    }
  );

  const keys = await res.json();

  return <KeysClient initialKeys={keys} />;
}
