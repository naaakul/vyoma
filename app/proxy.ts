import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // skip next internals & static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // protect only these routes
  const isProtected =
    pathname.startsWith("/dashboard") || pathname === "/get-credit";

  if (!isProtected) return NextResponse.next();

  // ✅ call session endpoint to validate auth
  const res = await fetch(new URL("/api/auth/session", req.url), {
    headers: {
      cookie: req.headers.get("cookie") ?? "",
    },
  });

  const session = await res.json().catch(() => null);

  if (!session?.user) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/get-credit"],
};
