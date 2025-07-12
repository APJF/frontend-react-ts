"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft, BookOpen, Shield } from "lucide-react"
import { useAPI } from "@/hooks/useAPI"
import URLMapping from "@/utils/URLMapping"
import { useNavigate } from "react-router-dom"

interface ResetPasswordData {
  otp: string
  newPassword: string
  confirmPassword: string
}

interface ResetPasswordError {
  field: string
  message: string
}

export function ResetPasswordForm() {
  const [formData, setFormData] = useState<ResetPasswordData>({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ResetPasswordError | null>(null)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")

  const { API } = useAPI()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Chỉ cho phép nhập số cho OTP
    if (name === "otp") {
      const numericValue = value.replace(/\D/g, "").slice(0, 6)
      setFormData((prev) => ({ ...prev, [name]: numericValue }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error when user starts typing
    if (error) setError(null)
    if (message) setMessage("")
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const validateForm = (): boolean => {

    if (!formData.otp) {
      setError({ field: "otp", message: "Vui lòng nhập mã OTP" })
      return false
    }

    if (formData.otp.length !== 6) {
      setError({ field: "otp", message: "Mã OTP phải có 6 số" })
      return false
    }

    if (!formData.newPassword) {
      setError({ field: "newPassword", message: "Vui lòng nhập mật khẩu mới" })
      return false
    }

    if (formData.newPassword.length < 6) {
      setError({ field: "newPassword", message: "Mật khẩu mới phải có ít nhất 6 ký tự" })
      return false
    }

    if (!formData.confirmPassword) {
      setError({ field: "confirmPassword", message: "Vui lòng xác nhận mật khẩu mới" })
      return false
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError({ field: "confirmPassword", message: "Mật khẩu xác nhận không khớp" })
      return false
    }

    return true
  }

  const handleResetPassword = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setError(null)
    setMessage("")
    const email= localStorage.getItem("email");
    try {
      const response = await API.post(URLMapping.RESET_PASSWORD + `?email=${email}&otp=${formData.otp}&newPassword=${formData.newPassword}`)

      if (response.success) {
        setSuccess(true)
        // Reset form
        setFormData({
          otp: "",
          newPassword: "",
          confirmPassword: "",
        })
      } else {
        const message = response.message
        setMessage(message)
      }
    } catch (err) {
      setError({
        field: "general",
        message: "Có lỗi xảy ra. Vui lòng thử lại.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt Lại Mật Khẩu Thành Công!</h2>
              <p className="text-gray-600">Mật khẩu của bạn đã được đặt lại thành công.</p>
            </div>
            <Button onClick={() => navigate("/login")} className="w-full bg-red-600 hover:bg-red-700 text-white mb-4">
              Đăng Nhập Ngay
            </Button>
            <Button
              variant="ghost"
              onClick={() => setSuccess(false)}
              className="w-full text-gray-600 hover:text-gray-700"
            >
              Đặt Lại Mật Khẩu Khác
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-red-600">日本語学習</h1>
          </div>
          <p className="text-gray-600">Học Tiếng Nhật Online</p>
        </div>

        <Card className="w-full shadow-2xl border-0">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">Đặt Lại Mật Khẩu</CardTitle>
              <CardDescription className="text-gray-600">
                Nhập email, mã OTP và mật khẩu mới để đặt lại mật khẩu
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && error.field === "general" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}

            <form className="space-y-4">

              {/* OTP */}
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium">
                  Mã OTP
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    placeholder="Nhập mã OTP 6 số"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className={`pl-10 h-12 text-center font-mono tracking-widest ${error?.field === "otp" ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    disabled={isLoading}
                  />
                </div>
                {error?.field === "otp" && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error.message}
                  </p>
                )}
                <p className="text-xs text-gray-500">Nhập mã OTP 6 số đã được gửi đến email của bạn</p>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  Mật Khẩu Mới
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    placeholder="Nhập mật khẩu mới"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 h-12 ${error?.field === "newPassword" ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {error?.field === "newPassword" && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error.message}
                  </p>
                )}
                <p className="text-xs text-gray-500">Mật khẩu phải có ít nhất 6 ký tự</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Xác Nhận Mật Khẩu Mới
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu mới"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 h-12 ${error?.field === "confirmPassword" ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {error?.field === "confirmPassword" && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {message && (
                <div style={{ color: "red" }} className="text-sm">
                  {message}
                </div>
              )}

              {/* Reset Password Button */}
              <Button
                type="button"
                onClick={handleResetPassword}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang Đặt Lại Mật Khẩu...
                  </div>
                ) : (
                  "Đặt Lại Mật Khẩu"
                )}
              </Button>
            </form>

            {/* Help Text */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Lưu ý:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Mã OTP có hiệu lực trong 10 phút</li>
                <li>• Mật khẩu mới phải có ít nhất 6 ký tự</li>
                <li>• Mật khẩu xác nhận phải trùng với mật khẩu mới</li>
                <li>• Kiểm tra email nếu chưa nhận được mã OTP</li>
              </ul>
            </div>

            {/* Japanese Learning Motivation */}
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔄</div>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-red-600">新しい始まり!</span> (Atarashii hajimari!)
                <br />
                Khởi đầu mới! Hãy tiếp tục hành trình học tập.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
