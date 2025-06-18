
import { redirect } from "react-router-dom"
import type { RegisterData, User } from "@/types/auth"
import URLMapping from "@/utils/URLMapping";
// Mock authentication functions - replace with your actual auth implementation
export async function loginWithEmail(email: string, password: string): Promise<User> {
  try {
    const response = await fetch(URLMapping.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Đăng nhập thất bại")
    }

    const data = await response.json()

    // Giả sử API trả về đối tượng user dạng string -> cần convert Date lại
    const user: User = {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    }

    redirect("/Home") // ← chỉ dùng trong Server Components (Next.js)
    // Nếu dùng React Router DOM thì dùng: `useNavigate()` trong component

    return user
  } catch (error: any) {
    throw new Error(error.message || "Đã có lỗi xảy ra")
  }
}

export async function registerWithEmail(data: RegisterData): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock validation - check if email already exists
  if (data.email === "existing@example.com") {
    throw new Error("An account with this email already exists")
  }

  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: data.email,
    name: data.name,
    avatar: "email",
    subscription: "free",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  redirect("/dashboard")
  return user
}

export async function loginWithGoogle(): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user: User = {
    id: "2",
    email: "user@gmail.com",
    name: "Google User",
    avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
    subscription: "vip",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  redirect("/dashboard")
  return user
}

export async function logout(): Promise<void> {
  redirect("/")
}

export async function getCurrentUser(): Promise<User | null> {
  return null
}
