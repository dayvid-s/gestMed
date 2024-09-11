import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const signInUrl = new URL("/", request.url);
  const homeUrl = new URL("/home", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    signInUrl.searchParams.set("expired", "1");
    return NextResponse.redirect(signInUrl);
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*"],
};