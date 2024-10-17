import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// It'll determine in which path middleware will run
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/category-chart/:path*"],
};

export async function middleware(request: NextRequest) {
  // console.log("Request Headers:", request.headers);
  const token = await getToken({ req: request });
  // console.log("Token:", token);
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/category-chart", request.url));
  }

  if (token && url.pathname === "/") {
    return NextResponse.redirect(new URL("/category-chart", request.url));
  }

  if (!token && url.pathname === "/") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (!token && url.pathname.startsWith("/category-chart")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}
