// apps/web/lib/session.ts
export async function getSession() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/session`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) return null;
  return res.json();
}
