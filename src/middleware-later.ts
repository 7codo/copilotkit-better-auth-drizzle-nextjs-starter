import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const globalExcludePaths = ["/sign-in", "/sign-up", "/", "/about"];
const apiExcludePaths = ["/api/health"];

function isExcludedPath(pathname: string, excludePaths: string[]) {
  return excludePaths.some((path) => pathname === path);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("better-auth.session_token");

  if (
    isExcludedPath(pathname, globalExcludePaths) ||
    (pathname.startsWith("/api") && isExcludedPath(pathname, apiExcludePaths))
  ) {
    return NextResponse.next();
  }

  if (!sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    "/(api|trpc)(.*)",
  ],
};
