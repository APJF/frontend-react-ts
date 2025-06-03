"use client"

import { Header } from "@/components/layout/Header/Header"
import { Footer } from "@/components/layout/Footer/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import "./globals.css"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-emerald-900 mb-6">
              Học tiếng Nhật
              <br />
              <span className="text-teal-600">Hiệu quả & Thú vị</span>
            </h1>
            <p className="text-xl text-emerald-700 mb-8 max-w-2xl mx-auto">
              Khám phá phương pháp học tiếng Nhật hiện đại với các khóa học từ N5 đến N1, được thiết kế bởi các chuyên
              gia hàng đầu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Bắt đầu học ngay
              </Button>
              <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600">
                Xem khóa học
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-emerald-900 mb-12">Tại sao chọn JapanLearn?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🎯 <span>Học theo trình độ</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Các khóa học được phân chia rõ ràng từ N5 đến N1, phù hợp với mọi trình độ từ người mới bắt đầu đến
                    nâng cao.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    👨‍🏫 <span>Giảng viên chuyên nghiệp</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Đội ngũ giảng viên có kinh nghiệm nhiều năm, được đào tạo bài bản và có chứng chỉ giảng dạy tiếng
                    Nhật.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📱 <span>Học mọi lúc mọi nơi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Nền tảng học trực tuyến hiện đại, hỗ trợ học trên mọi thiết bị với giao diện thân thiện.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Courses */}
        <section className="py-20 bg-emerald-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-emerald-900 mb-12">Khóa học phổ biến</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { level: "N5", title: "Tiếng Nhật cơ bản", price: "299,000đ", students: "1,234" },
                { level: "N4", title: "Tiếng Nhật sơ cấp", price: "399,000đ", students: "856" },
                { level: "N3", title: "Tiếng Nhật trung cấp", price: "499,000đ", students: "642" },
              ].map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-emerald-800">{course.title}</CardTitle>
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-medium">
                        {course.level}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-emerald-600">{course.price}</span>
                        <span className="text-sm text-gray-600">{course.students} học viên</span>
                      </div>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Đăng ký ngay</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
