"use client"

import { useState, useEffect, useCallback } from "react"
import { authService } from "@/services/auth"
import type { AuthState, LoginCredentials, RegisterData } from "@/types/auth"

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isVip: false,
  })

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }))
      const user = await authService.login(credentials.email, credentials.password)
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        isVip: user.subscription === "vip",
      })
      return { success: true }
    } catch (error: any) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: error.message }
    }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }))
      const user = await authService.register(data)
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        isVip: false,
      })
      return { success: true }
    } catch (error: any) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: error.message }
    }
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      isVip: false,
    })
  }, [])

  const checkAuth = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser()
      if (user) {
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
          isVip: user.subscription === "vip",
        })
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuth,
  }
}
