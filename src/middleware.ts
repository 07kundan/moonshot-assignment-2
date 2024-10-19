import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// It'll determine in which path middleware will run
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/category-chart/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If there is token redirect to the category-chart
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/category-chart", request.url));
  }

  // if (token && url.pathname === "/") {
  //   return NextResponse.redirect(new URL("/category-chart", request.url));
  // }

  // If token is not available redirect to the sign-in page
  if (!token && url.pathname === "/") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If token is not available redirect to the sign-in page
  if (!token && url.pathname.startsWith("/category-chart")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
