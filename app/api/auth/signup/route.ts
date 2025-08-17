import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, agencyName } = await request.json()

    // Basic validation
    if (!firstName || !lastName || !email || !password || !agencyName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists (in real app, check database)
    // For now, we'll just create a new user

    // Generate unique ID (in real app, use database auto-increment or UUID)
    const userId = Date.now().toString()

    // Create new user (in real app, save to database with hashed password)
    const newUser = {
      id: userId,
      email,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      agencyName,
      role: "agency_owner",
      plan: "starter", // Default plan
      createdAt: new Date().toISOString(),
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days trial
    }

    // Create JWT token
    const token = await new SignJWT({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      agencyName: newUser.agencyName,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET)

    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return NextResponse.json({
      success: true,
      user: newUser,
    })
  } catch (error) {
    console.error("Sign up error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
