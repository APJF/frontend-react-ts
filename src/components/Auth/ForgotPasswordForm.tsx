"use client"

// src/components/Auth/ForgotPasswordForm.tsx
import type React from "react"
import { useState } from "react"
import { forgotPassword } from "../../services/authService"
import type { ApiResponse } from "../../types/auth.d.ts"

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void // Callback when password reset email is sent
  onBackToLogin: () => void // Callback to return to login screen
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSuccess, onBackToLogin }) => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [userName, setUserName] = useState("Facebook user") // This would come from API in real implementation

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!email) {
      setError("Please enter your email address.")
      setIsLoading(false)
      return
    }

    // In a real implementation, you would verify the email exists before showing confirmation
    // For now, we'll just simulate a successful API call
    const response: ApiResponse = await forgotPassword(email)
    setIsLoading(false)

    if (response.success) {
      // Show the confirmation screen instead of immediately calling onSuccess
      setShowConfirmation(true)
    } else {
      setError(response.message)
    }
  }

  const handleContinue = () => {
    // When user clicks Continue, proceed to OTP verification
    onSuccess(email)
  }

  if (showConfirmation) {
    return (
      <form className="forgot-confirmation">
        <h1>We'll send you a code to your email address</h1>

        <div className="confirmation-box">
          <div className="email-section">
            <p>We can send a login code to:</p>
            <p className="email-value">{email}</p>
          </div>

          <div className="user-section">
            <div className="avatar-circle">{/* This would be an actual image in a real implementation */}</div>
            <p className="user-name">{userName}</p>
            <p className="user-type">Facebook user</p>
            <p className="not-you-text">Not you?</p>
          </div>
        </div>

        <div className="action-buttons">
          <button type="button" className="login-password-btn" onClick={onBackToLogin}>
            LOG IN WITH PASSWORD
          </button>

          <button type="button" className="continue-btn" onClick={handleContinue}>
            CONTINUE
          </button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      <p>Enter your email address and we'll send you a code to reset your password.</p>

      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Code"}
      </button>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          onBackToLogin()
        }}
      >
        Back to Login
      </a>
    </form>
  )
}

export default ForgotPasswordForm