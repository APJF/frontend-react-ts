"use client"

// src/components/Auth/RegisterForm.tsx
import type React from "react"
import { useState } from "react"
import { register } from "../../services/authService"
import type { RegisterDTO, ApiResponse } from "../../types/auth.d.ts"

interface RegisterFormProps {
  onSuccess: (email: string) => void // Callback khi register thành công, trả về email để verify
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    const userData: RegisterDTO = { username, email, password }
    const response: ApiResponse = await register(userData)

    setIsLoading(false)

    if (response.success) {
      // Gọi callback thành công, truyền email về cho AuthPage
      onSuccess(email)
      // Reset form (tùy chọn)
      // setName('');
      // setEmail('');
      // setPassword('');
    } else {
      setError(response.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <div className="social-icons">
        <a href="#" className="icon">
          <i className="fa-brands fa-google-plus-g"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="#" className="icon">
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
      </div>
      <span>or use your email for registration</span>
      {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        disabled={isLoading}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  )
}

export default RegisterForm