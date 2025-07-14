"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, AlertCircle, CheckCircle, ArrowLeft, Send, BookOpen } from "lucide-react"
import { useAPI } from "@/hooks/useAPI"
import URLMapping from "@/utils/URLMapping"
import { useNavigate } from "react-router-dom"

interface ForgotPasswordError {
  field: string
  message: string
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ForgotPasswordError | null>(null)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const navigate= useNavigate();

  const { API } = useAPI()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // Clear error when user starts typing
    if (error) setError(null)
    if (message) setMessage("")
  }

  const validateForm = (): boolean => {
    if (!email) {
      setError({ field: "email", message: "Vui lòng nhập email" })
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError({ field: "email", message: "Vui lòng nhập địa chỉ email hợp lệ" })
      return false
    }
    return true
  }

  const handleForgotPassword = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setError(null)
    setMessage("")

    try {
      const response = await API.post(URLMapping.FORGOT_PASSWORD+`?email=${email}`)

      if (response.success) {
        setSuccess(true);
        localStorage.setItem("email", email);
        navigate(`/resetpass`);
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

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">      <div className="w-full max-w-md">
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
                <Mail className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">Quên Mật Khẩu?</CardTitle>
              <CardDescription className="text-gray-600">
                Đừng lo lắng! Nhập email và chúng tôi sẽ gửi link đặt lại cho bạn
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
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Địa Chỉ Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Nhập địa chỉ email của bạn"
                    value={email}
                    onChange={handleInputChange}
                    className={`pl-10 h-12 ${
                      error?.field === "email" ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {error?.field === "email" && (
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

              {/* Send Reset Link Button */}
              <Button
                type="button"
                onClick={handleForgotPassword}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang Gửi Email...
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Gửi Link Đặt Lại
                  </>
                )}
              </Button>
            </form>

            {/* Help Text */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Cần trợ giúp?</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Kiểm tra thư mục spam/rác nếu không thấy email</li>
                <li>• Link đặt lại sẽ hết hạn sau 24 giờ</li>
                <li>• Liên hệ hỗ trợ nếu vẫn gặp vấn đề</li>
              </ul>
            </div>

            {/* Japanese Learning Motivation */}
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔑</div>
              <p className="text-sm text-gray-700">
                <span className="font-medium text-red-600">大丈夫!</span> (Daijoubu!)
                <br />
                Đừng lo! Chúng tôi sẽ giúp bạn quay lại học tập.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
