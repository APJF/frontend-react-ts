"use client"

import type React from "react"

import { useState } from "react"
import { Link, redirect } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { loginWithEmail, loginWithGoogle } from "@/lib/auth"
import type { LoginCredentials, LoginError } from "@/types/auth"
import { GoogleIcon } from "../icons/google-icon"
import { useAPI } from "@/hooks/useAPI"
import URLMapping from "@/utils/URLMapping"
import { useNavigate, useParams } from "react-router-dom"

export function LoginForm() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<LoginError | null>(null)
  const { API } = useAPI();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
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
    return true
  }

  const handleEmailLogin = async () => {
    const payload = {
      email: formData.email,
      password: formData.password,
    }

    const response = await API.post(URLMapping.LOGIN, payload);
    if (response.success) {
      const { jwtToken, username } = response.data;

      // Lưu token và user info
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate(`/home`);
    }else{
      const message= response.message;
      console.log(message);
      setMessage(message);
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await loginWithGoogle()
    } catch (err) {
      setError({
        field: "general",
        message: err instanceof Error ? err.message : "Google login failed. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl border-0">
      <CardHeader className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to continue your Japanese learning journey
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Google Login Button */}
        <Button
          variant="outline"
          className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <GoogleIcon className="mr-3 h-5 w-5" />
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with email</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && error.field === "general" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {/* Email Login Form */}
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
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
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </Label>
            </div>
            <Link to="/fogotpass" className="text-sm text-red-600 hover:text-red-700 font-medium">
              Quên Mật Khẩu?
            </Link>
          </div>
          <div style={{ color: "red" }}>
            {message}
          </div>
          <Button
            type="button" onClick={handleEmailLogin}
            className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-600 hover:text-red-700 font-medium">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Japanese Learning Motivation */}
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl mb-2">🎌</div>
          <p className="text-sm text-gray-700">
            <span className="font-medium text-red-600">頑張って!</span> (Ganbatte!)
            <br />
            Let's continue learning Japanese together!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
