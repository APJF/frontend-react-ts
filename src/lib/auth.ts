
import { redirect } from "react-router-dom"
import type { RegisterData, User } from "@/types/auth"

// Mock authentication functions - replace with your actual auth implementation
export async function loginWithEmail(email: string, password: string): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock validation
  if (email === "demo@example.com" && password === "password123") {
    const user: User = {
      id: "1",
      email: email,
      name: "Demo User",
      avatar: "email",
      subscription: "vip",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    redirect("/Home")
    return user
  }

  throw new Error("Invalid email or password")
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
