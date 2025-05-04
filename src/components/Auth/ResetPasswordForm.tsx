"use client"

// src/components/Auth/ResetPasswordForm.tsx
import type React from "react"
import { useState } from "react"
import { resetPassword } from "../../services/authService"
import type { ApiResponse } from "../../types/auth.d.ts"

interface ResetPasswordFormProps {
  email: string // Email address for the account being reset
  token?: string // Optional token from URL if using token-based reset
  onSuccess: (message: string) => void // Callback when password is successfully reset
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ email, token, onSuccess }) => {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validate passwords
    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields.")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.")
      setIsLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      setIsLoading(false)
      return
    }

    // In a real implementation, you would pass the token from the URL
    // For now, we'll just use the email and new password
    const response: ApiResponse = await resetPassword(email, newPassword)
    setIsLoading(false)

    if (response.success) {
      // Call the success callback
      onSuccess(response.message)
    } else {
      setError(response.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      <p>Create a new password for your account.</p>

      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        disabled={isLoading}
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  )
}

export default ResetPasswordForm