"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from "lucide-react"
import type { Subject } from "../entity"
interface CreateCourseData {
  id: string;
  title: string;
  description: string;
  estimatedDuration: string;
  level: string;
  image: string;
  requirement: string;
  prerequisite: string;
}

interface CreateCoursePageProps {
  onBack: () => void
  onCreateCourse: (courseData: CreateCourseData) => void
}

export function CreateCoursePage({ onBack, onCreateCourse }: CreateCoursePageProps) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    estimatedDuration: "",
    level: "",
    image: "",
    requirement: "",
    prerequisite: "",
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const levels = [
    { value: "N5", label: "N5" },
    { value: "N4", label: "N4" },
    { value: "N3", label: "N3" },
    { value: "N2", label: "N2" },
    { value: "N1", label: "N1" },
  ];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const courseData: any = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      duration: Number(formData.estimatedDuration),
      level: formData.level,
      image: formData.image || "",
      requirement: formData.requirement || "",
      status: "DRAFT",
    };
    if (formData.prerequisite && formData.prerequisite.trim() !== "") {
      courseData.prerequisiteCourseId = formData.prerequisite;
    } else {
      courseData.prerequisiteCourseId = null;
    }

    try {
      const response = await fetch("http://localhost:8080/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": "staff-01"
        },
        body: JSON.stringify(courseData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert("Tạo khóa học thành công!");
        window.location.href = "http://localhost:5173/viewlistcourse";
      } else {
        alert(data.message || "Tạo khóa học thất bại!");
      }
    } catch (err) {
      alert("Lỗi kết nối server!");
    }
  }
  const isFormValid = formData.id && formData.title && formData.description && formData.level && formData.estimatedDuration

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
          {/* Course ID */}
          <div>
            <Label htmlFor="id" className="text-sm font-medium text-blue-800 mb-2 block">
              Mã khóa học <span className="text-red-500">*</span>
            </Label>
            <Input
              id="id"
              value={formData.id}
              onChange={(e) => handleInputChange("id", e.target.value)}
              placeholder="Ví dụ: JPD334"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-blue-800 mb-2 block">
              Tiêu đề khóa học <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Ví dụ: Kana Basics"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
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

          {/* Estimated Duration */}
          <div>
            <Label htmlFor="estimatedDuration" className="text-sm font-medium text-blue-800 mb-2 block">
              Thời lượng (giờ) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="estimatedDuration"
              type="number"
              min="1"
              value={formData.estimatedDuration}
              onChange={(e) => handleInputChange("estimatedDuration", e.target.value)}
              placeholder="Ví dụ: 10"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Level */}
          <div>
            <Label className="text-sm font-medium text-blue-800 mb-2 block">
              Mức độ <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
              <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Chọn mức độ" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Requirement */}
          <div>
            <Label htmlFor="requirement" className="text-sm font-medium text-blue-800 mb-2 block">
              Yêu cầu đầu vào
            </Label>
            <Textarea
              id="requirement"
              value={formData.requirement}
              onChange={(e) => handleInputChange("requirement", e.target.value)}
              placeholder="Nhập yêu cầu đầu vào cho khóa học (nếu có)"
              rows={2}
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Prerequisite */}
          <div>
            <Label htmlFor="prerequisite" className="text-sm font-medium text-blue-800 mb-2 block">
              Môn tiên quyết (nếu có)
            </Label>
            <Input
              id="prerequisite"
              value={formData.prerequisite}
              onChange={(e) => handleInputChange("prerequisite", e.target.value)}
              placeholder="Ví dụ: JPD111"
              className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
            />
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
