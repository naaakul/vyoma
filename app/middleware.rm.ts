// import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ["/dashboard"];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   if (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/favicon.ico") ||
//     pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
//   if (!isProtected) return NextResponse.next();

//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     const url = req.nextUrl.clone();
//     url.pathname = "/auth/sign-in";
//     url.searchParams.set("next", pathname);
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
