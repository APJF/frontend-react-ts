"use client"

// src/pages/AuthPage.tsx
import type React from "react"
import { useState, useEffect } from "react"
import LoginForm from "../components/Auth/LoginForm"
import RegisterForm from "../components/Auth/RegisterForm"
import VerifyOtpForm from "../components/Auth/VerifyOtpForm"
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm"
import ResetPasswordForm from "../components/Auth/ResetPasswordForm"
import "../styles/AuthPage.css" // Import CSS

// Enum để quản lý các màn hình con
enum AuthView {
  LOGIN = 0,
  REGISTER = 1,
  VERIFY_OTP = 2,
  FORGOT_PASSWORD = 3,
  RESET_PASSWORD = 4,
}

const AuthPage: React.FC = () => {
  // State để quản lý trạng thái active (tương tự class 'active' trong JS cũ)
  const [isRegisterActive, setIsRegisterActive] = useState(false)
  // State để quản lý màn hình nào đang hiển thị (mở rộng cho các chức năng khác)
  const [currentView, setCurrentView] = useState<AuthView>(AuthView.LOGIN)
  // State để lưu email (ví dụ: cần cho màn hình verify OTP)
  const [emailForVerification, setEmailForVerification] = useState<string | null>(null)
  // State to track if we're in password reset flow
  const [isPasswordResetFlow, setIsPasswordResetFlow] = useState(false)
  // State to control the special animation for OTP to Reset Password
  const [isResetPasswordActive, setIsResetPasswordActive] = useState(false)

  // useEffect để đồng bộ isRegisterActive với currentView khi cần
  useEffect(() => {
    // Only set register active for the actual register view
    setIsRegisterActive(currentView === AuthView.REGISTER)
  }, [currentView])

  // --- Hàm xử lý chuyển đổi giữa Login và Register ---
  const handleShowRegister = () => {
    setCurrentView(AuthView.REGISTER)
  }

  const handleShowLogin = () => {
    setCurrentView(AuthView.LOGIN)
  }

  // --- Hàm Callback sau khi Register thành công ---
  const onRegisterSuccess = (email: string) => {
    console.log("Register success callback triggered for:", email)
    setEmailForVerification(email)
    setIsPasswordResetFlow(false)
    setCurrentView(AuthView.VERIFY_OTP)
  }

  // --- Hàm Callback sau khi Login thành công ---
  const onLoginSuccess = (message: string) => {
    console.log("Login successful:", message)
    // TODO: Chuyển hướng người dùng đến trang dashboard hoặc trang chính
    alert(`Login Success: ${message}`)
  }

  // --- Hàm Callback sau khi Verify OTP thành công ---
  const onVerifySuccess = (message: string) => {
    console.log("Verification successful:", message)

    if (isPasswordResetFlow) {
      // If we're in password reset flow, trigger the special animation
      // and then show the reset password form
      setIsResetPasswordActive(true)
      setTimeout(() => {
        setCurrentView(AuthView.RESET_PASSWORD)
      }, 50)
    } else {
      // Otherwise, this is account verification after registration
      alert(`Verification Success: ${message}. You can now login.`)
      setCurrentView(AuthView.LOGIN)
    }
  }

  // --- Hàm Callback sau khi yêu cầu Forgot Password thành công ---
  const onForgotPasswordSuccess = (email: string) => {
    console.log("Forgot password request successful for:", email)
    setEmailForVerification(email)
    setIsPasswordResetFlow(true)
    setCurrentView(AuthView.VERIFY_OTP)
  }

  // --- Hàm Callback sau khi Reset Password thành công ---
  const onResetPasswordSuccess = (message: string) => {
    console.log("Reset password successful:", message)
    alert(`Reset Password Success: ${message}. You can now login with your new password.`)
    setIsResetPasswordActive(false)
    setCurrentView(AuthView.LOGIN)
  }

  return (
    <div
      className={`container ${isRegisterActive ? "active" : ""} ${isResetPasswordActive ? "reset-active" : ""}`}
      id="container"
    >
      {/* Phần Form Container sẽ chứa component form tương ứng */}
      <div className="form-container sign-up">
        {/* Chỉ render RegisterForm khi view là REGISTER */}
        {currentView === AuthView.REGISTER && <RegisterForm onSuccess={onRegisterSuccess} />}
        {/* Add Reset Password Form here for the animation */}
        {isResetPasswordActive && currentView === AuthView.RESET_PASSWORD && (
          <ResetPasswordForm email={emailForVerification || "test@example.com"} onSuccess={onResetPasswordSuccess} />
        )}
      </div>
      <div className="form-container sign-in">
        {/* Render form tương ứng với currentView */}
        {currentView === AuthView.LOGIN && (
          <LoginForm
            onSuccess={onLoginSuccess}
            onForgotPasswordClick={() => setCurrentView(AuthView.FORGOT_PASSWORD)}
          />
        )}
        {currentView === AuthView.VERIFY_OTP && emailForVerification && (
          <VerifyOtpForm
            email={emailForVerification}
            onSuccess={onVerifySuccess}
            isPasswordReset={isPasswordResetFlow}
          />
        )}
        {currentView === AuthView.FORGOT_PASSWORD && (
          <ForgotPasswordForm
            onSuccess={onForgotPasswordSuccess}
            onBackToLogin={() => setCurrentView(AuthView.LOGIN)}
          />
        )}
        {/* Only render Reset Password in sign-in container when not in the special animation */}
        {!isResetPasswordActive && currentView === AuthView.RESET_PASSWORD && (
          <ResetPasswordForm email={emailForVerification || "test@example.com"} onSuccess={onResetPasswordSuccess} />
        )}
      </div>

      {/* Phần Toggle Container để chuyển đổi */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login" onClick={handleShowLogin}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" id="register" onClick={handleShowRegister}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage