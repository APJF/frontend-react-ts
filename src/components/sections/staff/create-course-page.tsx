"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Plus } from "lucide-react"
import type { Subject } from "../entity"
interface CreateCoursePageProps {
  onBack: () => void
  onCreateCourse: (courseData: Omit<Subject, "id" | "createdAt" | "updatedAt" | "chapters">) => void
}

export function CreateCoursePage({ onBack, onCreateCourse }: CreateCoursePageProps) {
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: "",
    level: "",
    estimatedDuration: "",
    creatorId: "",
    image: "",
    status: "Pending",
    orderNumber: 1,
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const levels = [
    { value: "Cơ bản", label: "Cơ bản" },
    { value: "N5", label: "N5" },
    { value: "N4", label: "N4" },
    { value: "N3", label: "N3" },
    { value: "N2", label: "N2" },
    { value: "N1", label: "N1" },
  ]

  const topics = [
    { value: "japanese-basic", label: "Tiếng Nhật cơ bản" },
    { value: "japanese-grammar", label: "Ngữ pháp tiếng Nhật" },
    { value: "japanese-conversation", label: "Giao tiếp tiếng Nhật" },
    { value: "japanese-business", label: "Tiếng Nhật thương mại" },
    { value: "japanese-culture", label: "Văn hóa Nhật Bản" },
    { value: "jlpt-prep", label: "Luyện thi JLPT" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileSelect = (file: File) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif")) {
      setSelectedFile(file)
      // In a real app, you would upload the file and get a URL
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, image: imageUrl }))
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate a unique topic code if not provided
    const topicCode = formData.topic || `JP${String(Date.now()).slice(-3)}`

    const courseData = {
      ...formData,
      topic: topicCode,
      creatorId: formData.creatorId || "Admin",
      studentCount: 0,
      lessonCount: 0,
      rating: 0,
    }

    onCreateCourse(courseData)
  }

  const isFormValid = formData.title && formData.description && formData.level

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={window.history.back} className="p-2 hover:bg-blue-100 text-blue-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-blue-900">Tạo khóa học mới</h1>
              <p className="text-sm text-blue-600">Thêm khóa học mới vào hệ thống</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-blue-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-blue-900 mb-6 border-b border-blue-100 pb-3">Thông tin cơ bản</h2>

            <div className="space-y-6">
              {/* Course Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-blue-800 mb-2 block">
                  Tiêu đề khóa học <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Ví dụ: Tiếng Nhật N5 - Cơ bản"
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Course Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-blue-800 mb-2 block">
                  Mô tả khóa học <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Mô tả chi tiết về nội dung, mục tiêu và đối tượng học viên của khóa học..."
                  rows={4}
                  className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              {/* Topic */}
              <div>
                <Label className="text-sm font-medium text-blue-800 mb-2 block">
                  Chủ đề <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Select value={formData.topic} onValueChange={(value) => handleInputChange("topic", value)}>
                    <SelectTrigger className="flex-1 border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Chọn chủ đề cho khóa học" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic.value} value={topic.value}>
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="px-3 border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Duration and Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-blue-800 mb-2 block">
                    Mức độ <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                    <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Chọn mức độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>      
            </div>
          </div>

          {/* Course Image */}
          <div className="bg-white rounded-lg border border-blue-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-blue-900 mb-6 border-b border-blue-100 pb-3">Ảnh khóa học</h2>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : selectedFile
                    ? "border-green-300 bg-green-50"
                    : "border-blue-300 hover:border-blue-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border border-blue-200">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Course preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-700">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFile(null)
                      setFormData((prev) => ({ ...prev, image: "" }))
                    }}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Xóa ảnh
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-blue-400 mx-auto" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">Tải lên ảnh khóa học</p>
                    <p className="text-xs text-blue-500 mt-1">PNG, JPG, GIF tối đa 10MB</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">Choose File</span>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileInputChange}
                      />
                    </label>
                    <span className="text-sm text-blue-500 mx-2">or drag and drop</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="px-6 border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
            >
              Tạo khóa học
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
