import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

// Mock user data (in real app, this would be from database)
const MOCK_USERS = [
  {
    id: "1",
    email: "demo@agency.com",
    name: "Demo Agency",
    agencyName: "Demo Real Estate",
    role: "agency_owner",
    plan: "professional",
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Get user data (in real app, query database)
    const user = MOCK_USERS.find((u) => u.id === payload.userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
