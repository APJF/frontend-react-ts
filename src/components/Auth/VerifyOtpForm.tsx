"use client"

// src/components/Auth/VerifyOtpForm.tsx
import type React from "react"
import { useState } from "react"
import { verifyAccount, regenerateOtp } from "../../services/authService"
import type { ApiResponse } from "../../types/auth.d.ts"

interface VerifyOtpFormProps {
  email: string // Email được truyền từ AuthPage
  onSuccess: (message: string) => void // Callback khi verify thành công
  isPasswordReset?: boolean // Flag to indicate if this is for password reset
}

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({ email, onSuccess, isPasswordReset = false }) => {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(`An OTP has been sent to ${email}. Please check your inbox.`) // Thông báo ban đầu
  const [isLoading, setIsLoading] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleVerifySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setIsLoading(true)

    if (!otp || otp.length < 6) {
      // Giả sử OTP có 6 ký tự
      setError("Please enter a valid OTP.")
      setIsLoading(false)
      return
    }

    const response: ApiResponse = await verifyAccount(email, otp)
    setIsLoading(false)

    if (response.success) {
      onSuccess(response.message)
    } else {
      setError(response.message)
    }
  }

  const handleRegenerateOtp = async () => {
    setError(null)
    setMessage(null)
    setIsRegenerating(true)

    const response: ApiResponse = await regenerateOtp(email)
    setIsRegenerating(false)

    if (response.success) {
      setMessage(response.message + " Please check your email again.") // Cập nhật thông báo
    } else {
      setError(response.message)
    }
  }

  return (
    <form onSubmit={handleVerifySubmit}>
      <h1>{isPasswordReset ? "Verify to Reset Password" : "Verify Your Account"}</h1>
      {message && <p style={{ color: "green", fontSize: "14px" }}>{message}</p>}
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

      <p>Enter the OTP sent to {email}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6} // Giả sử OTP 6 ký tự
        required
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </button>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          handleRegenerateOtp()
        }}
      >
        {isRegenerating ? "Sending..." : "Resend OTP"}
      </a>
    </form>
  )
}

export default VerifyOtpForm