"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Info, Sparkles, Plus, Hash } from "lucide-react"
import type { Subject } from "../entity"

interface AddChapterPageProps {
  course: Subject
  onBack: () => void
  onCreateChapter: (chapterData: {
    title: string
    description: string
    orderNumber: number
    subjectId: number
  }) => void
}

export function AddChapterPage({ course, onBack, onCreateChapter }: AddChapterPageProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    orderNumber: (course.chapters?.length || 0) + 1,
  })

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateChapter({
      ...formData,
      subjectId: course.id,
    })
  }

  const isFormValid = formData.title.trim() && formData.description.trim()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-blue-100 text-blue-600 rounded-full transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-blue-900 mb-1">Thêm chương mới</h1>
              <p className="text-blue-600 text-sm font-medium">Tạo chương học mới cho khóa học tiếng Nhật</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Course Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm sticky top-24">
              <CardContent className="p-8">
                {/* Course Info Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-blue-900">Thông tin khóa học</h2>
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                </div>

                {/* Course Image */}
                <div className="mb-6">
                  <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl border-2 border-blue-200 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-blue-600 font-medium text-sm">Ảnh khóa học</p>
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-600 font-medium text-sm">ID Khóa học</span>
                      <Badge className="bg-blue-600 text-white font-mono text-xs">{course.topic}</Badge>
                    </div>
                  </div>

                  <div>
                    <div className="text-blue-600 font-medium text-sm mb-2">Tên khóa học</div>
                    <h3 className="text-blue-900 font-bold text-lg leading-tight">{course.title}</h3>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-700 font-medium text-sm">Số chương hiện tại</span>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-green-600" />
                        <span className="text-2xl font-bold text-green-800">{course.chapters?.length || 0}</span>
                        <span className="text-green-600 text-sm">chương</span>
                      </div>
                    </div>
                  </div>

                  {/* Info Note */}
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-1 rounded-full mt-0.5">
                        <Info className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-amber-800 text-sm font-medium mb-1">Lưu ý về thứ tự</p>
                        <p className="text-amber-700 text-xs leading-relaxed">
                          Chương mới sẽ được thêm vào cuối danh sách. Bạn có thể thay đổi thứ tự sau khi tạo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                {/* Form Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-blue-900">Thông tin chương mới</h2>
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Chapter Name */}
                  <div className="space-y-3">
                    <Label htmlFor="title" className="text-blue-800 font-semibold text-base flex items-center gap-2">
                      Tên chương <span className="text-red-500">*</span>
                      <div className="bg-blue-100 p-1 rounded-full">
                        <BookOpen className="h-3 w-3 text-blue-600" />
                      </div>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Ví dụ: Hiragana - Bảng chữ cái cơ bản"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-base py-3 bg-white/80 backdrop-blur-sm"
                      required
                    />
                    <p className="text-blue-600 text-xs">Nhập tên chương rõ ràng và dễ hiểu cho học viên</p>
                  </div>

                  {/* Chapter Description */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="description"
                      className="text-blue-800 font-semibold text-base flex items-center gap-2"
                    >
                      Mô tả chương <span className="text-red-500">*</span>
                      <div className="bg-blue-100 p-1 rounded-full">
                        <Info className="h-3 w-3 text-blue-600" />
                      </div>
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Mô tả chi tiết về nội dung và mục tiêu của chương học..."
                      rows={5}
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 resize-none text-base bg-white/80 backdrop-blur-sm"
                      required
                    />
                    <p className="text-blue-600 text-xs">
                      Mô tả nội dung, mục tiêu học tập và những gì học viên sẽ đạt được
                    </p>
                  </div>

                  {/* Order Number */}
                  <div className="space-y-3">
                    <Label htmlFor="order" className="text-blue-800 font-semibold text-base flex items-center gap-2">
                      Thứ tự học <span className="text-red-500">*</span>
                      <div className="bg-blue-100 p-1 rounded-full">
                        <Hash className="h-3 w-3 text-blue-600" />
                      </div>
                    </Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="order"
                        type="number"
                        min="1"
                        value={formData.orderNumber}
                        onChange={(e) => handleInputChange("orderNumber", Number.parseInt(e.target.value) || 1)}
                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-base py-3 w-32 bg-white/80 backdrop-blur-sm font-mono text-center"
                        required
                      />
                      <div className="flex-1 bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-blue-700 text-sm font-medium">
                          Chương sẽ được sắp xếp theo thứ tự này trong khóa học
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-8 border-t border-blue-100">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onBack}
                      className="px-8 py-3 border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent font-medium"
                    >
                      Hủy
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isFormValid}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tạo chương
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
