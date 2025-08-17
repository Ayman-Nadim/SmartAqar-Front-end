import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/campaigns",
  "/prospects",
  "/matches",
  "/catalog-builder",
  "/client-management",
  "/admin",
]

// Routes that should redirect authenticated users
const authRoutes = ["/signin", "/signup"]

const CLIENT_SUBDOMAINS = ["casablanca-premium", "rabat-elite", "marrakech-luxury", "tangier-coastal", "fez-heritage"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get("host") || ""
  const token = request.cookies.get("auth-token")?.value

  // Check if this is a client subdomain (e.g., casablanca-premium.smartaqar.com)
  const subdomain = hostname.split(".")[0]
  const isClientSubdomain = CLIENT_SUBDOMAINS.includes(subdomain) && hostname.includes("smartaqar.com")

  if (isClientSubdomain) {
    // Redirect to the client catalog page
    const catalogUrl = new URL(`/catalog/${subdomain}`, request.url)
    return NextResponse.rewrite(catalogUrl)
  }

  // If hostname is not the main domain and not localhost, treat as custom domain
  const isMainDomain =
    hostname.includes("smartaqar.com") || hostname.includes("localhost") || hostname.includes("127.0.0.1")
  if (!isMainDomain && !hostname.includes("vercel.app")) {
    // For custom domains, we would look up the client by domain
    // For now, redirect to main site
    return NextResponse.redirect(new URL("https://smartaqar.com", request.url))
  }

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if it's an auth route
  const isAuthRoute = authRoutes.includes(pathname)

  if (isProtectedRoute) {
    if (!token) {
      // Redirect to signin if no token
      return NextResponse.redirect(new URL("/signin", request.url))
    }

    try {
      // Verify token
      await jwtVerify(token, JWT_SECRET)
      // Token is valid, continue
      return NextResponse.next()
    } catch (error) {
      // Invalid token, redirect to signin
      const response = NextResponse.redirect(new URL("/signin", request.url))
      response.cookies.delete("auth-token")
      return response
    }
  }

  if (isAuthRoute && token) {
    try {
      // Verify token
      await jwtVerify(token, JWT_SECRET)
      // Valid token, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } catch (error) {
      // Invalid token, clear it and continue to auth page
      const response = NextResponse.next()
      response.cookies.delete("auth-token")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
