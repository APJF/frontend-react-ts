export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscription: "free" | "vip"
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isVip: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  token: string
}
