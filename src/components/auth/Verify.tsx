"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Shield } from "lucide-react"
import { useNavigate } from "react-router-dom"
import URLMapping from "@/utils/URLMapping"
import { useAPI } from "@/hooks/useAPI"
import { message } from "antd"

export default function SimpleVerify() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { API } = useAPI();
  const message = localStorage.getItem("message");

  const handleVerify = async () => {
    const email = localStorage.getItem("email");

    try {
      const response = await API.post(URLMapping.VEFIRY + `?email=${email}&otp=${otp}`);

      if (!response.success) {
        localStorage.setItem("message", response.message);
        navigate(`/verify`)
      } else {
        navigate(`/login`);
      }
    } catch (error) {
      console.error("Lỗi xác thực:", error);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-red-600">日本語学習</h1>
          </div>
          <p className="text-gray-600">Học Tiếng Nhật Online</p>
        </div>

        <Card className="border-red-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-xl">Xác Thực OTP</CardTitle>
            <CardDescription className="text-red-100">Nhập mã xác thực để tiếp tục</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {/* OTP Input */}
            <div className="mb-6">
              <Label htmlFor="otp" className="text-sm font-medium text-gray-700 mb-2 block">
                Mã OTP
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center text-lg border-red-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div style={{ color: "red" }}>
              {message}
            </div>
            {/* Verify Button */}
            <Button onClick={handleVerify} className="w-full bg-red-600 hover:bg-red-700 text-white">
              <Shield className="h-4 w-4 mr-2" />
              Xác Nhận
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
