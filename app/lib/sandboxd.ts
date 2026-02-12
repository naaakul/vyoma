export async function callSandboxd(path: string, body: unknown) {
  return fetch(`${process.env.SANDBOXD_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": process.env.SANDBOX_SHARED_SECRET!,
    },
    body: JSON.stringify(body),
  });
}
