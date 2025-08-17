export interface User {
  id: string
  email: string
  name: string
  agencyName: string
  role: string
  plan: string
  createdAt: string
  trialEndsAt?: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
}

export class AuthService {
  static async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      return {
        success: false,
        error: "Network error. Please try again.",
      }
    }
  }

  static async signUp(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    agencyName: string
  }): Promise<AuthResponse> {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()
      return data
    } catch (error) {
      return {
        success: false,
        error: "Network error. Please try again.",
      }
    }
  }

  static async logout(): Promise<void> {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch("/api/auth/me")
      const data = await response.json()

      if (data.success) {
        return data.user
      }
      return null
    } catch (error) {
      return null
    }
  }
}
