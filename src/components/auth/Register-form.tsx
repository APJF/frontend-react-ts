"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle, User } from "lucide-react"
import { GoogleIcon } from "@/components/icons/google-icon"
import { registerWithEmail, loginWithGoogle } from "@/lib/auth"
import type { RegisterData, RegisterError } from "@/types/auth"
import URLMapping from "@/utils/URLMapping"
import { useAPI } from "@/hooks/useAPI"
import { useNavigate } from "react-router-dom"


export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<RegisterError | null>(null)
  const { API } = useAPI();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError({ field: "email", message: "Email is required" })
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError({ field: "email", message: "Please enter a valid email address" })
      return false
    }
    if (!formData.password) {
      setError({ field: "password", message: "Password is required" })
      return false
    }
    if (formData.password.length < 6) {
      setError({ field: "password", message: "Password must be at least 6 characters" })
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError({ field: "confirmPassword", message: "Passwords do not match" })
      return false
    }
    return true
  }
  const registerWithEmail = async (): Promise<void> => {
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      setIsLoading(true);
      const response = await API.post(URLMapping.REGISTER, payload);

      if (response.success) {
        localStorage.setItem("email", formData.email); // <-- bạn nên set từ formData
        navigate(`/verify`);
      } else {
        setError({
          field: "general",
          message: response.message || "Registration failed",
        });
      }
    } catch (err: any) {
      setError({
        field: "general",
        message: err?.message || "Registration failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-0">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">Tạo tài khoản của bạn</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Button
          variant="outline"
          className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
          disabled={isLoading}
        >
          <GoogleIcon className="mr-3 h-5 w-5" />
          Đăng nhập với Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Hoặc đăng ký với email</span>
          </div>
        </div>

        {error && error.field === "general" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) {
              registerWithEmail();
            }
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Nhập email của bạn"
                value={formData.email}
                onChange={handleInputChange}
                className={`pl-10 h-12 ${error?.field === "email" ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
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

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Mật khẩu
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleInputChange}
                className={`pl-10 pr-10 h-12 ${error?.field === "password" ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error?.field === "password" && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Xác nhận mật khẩu
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`pl-10 pr-10 h-12 ${error?.field === "confirmPassword" ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error?.field === "confirmPassword" && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Đăng ký
              </div>
            ) : (
              "Đăng ký"
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🎌</div>
          <p className="text-sm text-gray-700">
            <span className="font-medium text-red-600">ようこそ!</span> (Youkoso!)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.")
}

function setError(arg0: null) {
  throw new Error("Function not implemented.")
}

