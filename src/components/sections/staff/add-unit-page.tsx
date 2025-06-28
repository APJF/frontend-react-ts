"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ArrowLeft,
  BookOpen,
  Info,
  Sparkles,
  Plus,
  Hash,
  Upload,
  FileText,
  Video,
  Headphones,
  ImageIcon,
  ChevronDown,
  ChevronRight,
  X,
  Clock,
  Target,
  Award,
} from "lucide-react"
import type { Subject,Chapter } from "../entity"

interface AddLessonPageProps {
  course: Subject
  chapter: Chapter
  onBack: () => void
  onCreateLesson: (lessonData: {
    title: string
    orderNumber: number
    chapterId: number
    materials: Array<{
      type: string
      name: string
      description: string
      file?: File
    }>
  }) => void
}

export function AddLessonPage({ course, chapter, onBack, onCreateLesson }: AddLessonPageProps) {
  const [formData, setFormData] = useState({
    title: "",
    orderNumber: 9, // Next lesson number
  })

  const [materials, setMaterials] = useState([
    {
      id: 1,
      type: "",
      name: "",
      description: "",
      file: null as File | null,
      expanded: true,
    },
  ])

  const materialTypes = [
    { value: "pdf", label: "Tài liệu PDF", icon: FileText },
    { value: "video", label: "Video bài giảng", icon: Video },
    { value: "audio", label: "File âm thanh", icon: Headphones },
    { value: "image", label: "Hình ảnh", icon: ImageIcon },
    { value: "presentation", label: "Bài thuyết trình", icon: BookOpen },
  ]

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMaterialChange = (id: number, field: string, value: string | File | null) => {
    setMaterials((prev) => prev.map((material) => (material.id === id ? { ...material, [field]: value } : material)))
  }

  const addMaterial = () => {
    const newId = Math.max(...materials.map((m) => m.id)) + 1
    setMaterials((prev) => [
      ...prev,
      {
        id: newId,
        type: "",
        name: "",
        description: "",
        file: null,
        expanded: true,
      },
    ])
  }

  const removeMaterial = (id: number) => {
    if (materials.length > 1) {
      setMaterials((prev) => prev.filter((material) => material.id !== id))
    }
  }

  const toggleMaterial = (id: number) => {
    setMaterials((prev) =>
      prev.map((material) => (material.id === id ? { ...material, expanded: !material.expanded } : material)),
    )
  }

  const handleFileSelect = (id: number, file: File | null) => {
    handleMaterialChange(id, "file", file)
  }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onCreateLesson({
//       ...formData,
//       chapterId: chapter.id,
//       materials: materials.map(({ id, expanded, ...material }) => material),
//     })
//   }

  const isFormValid = formData.title.trim() && materials.every((m) => m.type && m.name.trim())

  const getTypeIcon = (type: string) => {
    const materialType = materialTypes.find((t) => t.value === type)
    return materialType ? materialType.icon : FileText
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="p-2 hover:bg-blue-100 text-blue-600 rounded-full transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-blue-900 mb-1">Thêm bài học mới</h1>
              <p className="text-blue-600 text-sm font-medium">Tạo bài học mới cho chương học</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Course & Chapter Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm sticky top-24">
              <CardContent className="p-8">
                {/* Course Info Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                      <Info className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-blue-900">Thông tin</h2>
                  </div>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                </div>

                {/* Course Image */}
                <div className="mb-6">
                  <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl border-2 border-blue-200 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-blue-600 font-medium text-xs">Ảnh khóa học</p>
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="space-y-4 mb-8">
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-600 font-medium text-xs">ID KHÓA HỌC</span>
                      <Badge className="bg-blue-600 text-white font-mono text-xs">{course.topic}</Badge>
                    </div>
                  </div>

                  <div>
                    <div className="text-blue-600 font-medium text-xs mb-1">TÊN KHÓA HỌC</div>
                    <h3 className="text-blue-900 font-bold text-sm leading-tight">{course.title}</h3>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-700 font-medium text-xs">MỨC ĐỘ</span>
                      <Badge className="bg-green-600 text-white text-xs">{course.level}</Badge>
                    </div>
                  </div>
                </div>

                {/* Chapter Info */}
                <div className="border-t border-blue-100 pt-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="h-4 w-4 text-purple-600" />
                      <span className="text-purple-600 font-medium text-xs">CHƯƠNG</span>
                    </div>
                    <Badge className="bg-purple-600 text-white text-xs mb-2">Chapter - {chapter.orderNumber}</Badge>
                  </div>

                  <div className="mb-4">
                    <div className="text-purple-600 font-medium text-xs mb-1">TÊN CHƯƠNG</div>
                    <h4 className="text-purple-900 font-bold text-sm leading-tight">{chapter.title}</h4>
                  </div>

                  <div className="mb-4">
                    <div className="text-purple-600 font-medium text-xs mb-1">THỨ TỰ CHƯƠNG</div>
                    <div className="text-purple-900 font-semibold">Chương {chapter.orderNumber}</div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <span className="text-orange-700 font-medium text-xs">SỐ BÀI HỌC HIỆN TẠI</span>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-orange-600" />
                        <span className="text-xl font-bold text-orange-800">8</span>
                        <span className="text-orange-600 text-xs">bài học</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Stats */}
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-indigo-50 rounded-lg p-3 text-center border border-indigo-200">
                      <Clock className="h-4 w-4 text-indigo-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-indigo-900">25</div>
                      <div className="text-xs text-indigo-600">phút/bài</div>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-3 text-center border border-pink-200">
                      <Award className="h-4 w-4 text-pink-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-pink-900">95%</div>
                      <div className="text-xs text-pink-600">hoàn thành</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Form */}
          <div className="lg:col-span-2">
            <form className="space-y-8">
              {/* Lesson Information */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-2 rounded-lg">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-xl font-bold text-blue-900">Thông tin bài học</h2>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lesson Name */}
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-blue-800 font-semibold text-base flex items-center gap-2">
                        Tên bài học <span className="text-red-500">*</span>
                        <div className="bg-blue-100 p-1 rounded-full">
                          <BookOpen className="h-3 w-3 text-blue-600" />
                        </div>
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Ví dụ: Ngữ pháp về Hiragana"
                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-base py-3 bg-white/80 backdrop-blur-sm"
                        required
                      />
                    </div>

                    {/* Lesson Order */}
                    <div className="space-y-3">
                      <Label htmlFor="order" className="text-blue-800 font-semibold text-base flex items-center gap-2">
                        Thứ tự học <span className="text-red-500">*</span>
                        <div className="bg-blue-100 p-1 rounded-full">
                          <Hash className="h-3 w-3 text-blue-600" />
                        </div>
                      </Label>
                      <Input
                        id="order"
                        type="number"
                        min="1"
                        value={formData.orderNumber}
                        onChange={(e) => handleInputChange("orderNumber", Number.parseInt(e.target.value) || 1)}
                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-base py-3 w-full bg-white/80 backdrop-blur-sm font-mono text-center"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lesson Materials */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-blue-900">Tài liệu bài học</h2>
                      </div>
                      <Button
                        type="button"
                        onClick={addMaterial}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm tài liệu
                      </Button>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                  </div>

                  <div className="space-y-4">
                    {materials.map((material, index) => {
                      const IconComponent = getTypeIcon(material.type)
                      return (
                        <div
                          key={material.id}
                          className="border border-purple-200 rounded-xl bg-gradient-to-r from-white to-purple-50/30"
                        >
                          <Collapsible open={material.expanded} onOpenChange={() => toggleMaterial(material.id)}>
                            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-purple-50/50 transition-colors rounded-xl">
                              <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                  {index + 1}
                                </div>
                                <div className="text-left">
                                  <h3 className="font-semibold text-purple-900">
                                    Tài liệu {index + 1}
                                    {material.name && ` - ${material.name}`}
                                  </h3>
                                  {material.type && (
                                    <div className="flex items-center gap-2 mt-1">
                                      <IconComponent className="h-4 w-4 text-purple-600" />
                                      <span className="text-sm text-purple-600">
                                        {materialTypes.find((t) => t.value === material.type)?.label}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {materials.length > 1 && (
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeMaterial(material.id)
                                    }}
                                    className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                                {material.expanded ? (
                                  <ChevronDown className="h-5 w-5 text-purple-400" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-purple-400" />
                                )}
                              </div>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="border-t border-purple-200 bg-purple-50/30">
                              <div className="p-6 space-y-6">
                                {/* Material Type */}
                                <div className="space-y-2">
                                  <Label className="text-purple-800 font-medium">
                                    Loại tài liệu <span className="text-red-500">*</span>
                                  </Label>
                                  <Select
                                    value={material.type}
                                    onValueChange={(value) => handleMaterialChange(material.id, "type", value)}
                                  >
                                    <SelectTrigger className="border-purple-300 focus:border-purple-500 focus:ring-purple-500">
                                      <SelectValue placeholder="Chọn loại tài liệu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {materialTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                          <div className="flex items-center gap-2">
                                            <type.icon className="h-4 w-4" />
                                            {type.label}
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                {/* Material Name */}
                                <div className="space-y-2">
                                  <Label className="text-purple-800 font-medium">
                                    Tên tài liệu <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    value={material.name}
                                    onChange={(e) => handleMaterialChange(material.id, "name", e.target.value)}
                                    placeholder="Ví dụ: Bảng Hiragana cơ bản"
                                    className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                                    required
                                  />
                                </div>

                                {/* Material Description */}
                                <div className="space-y-2">
                                  <Label className="text-purple-800 font-medium">Mô tả tài liệu</Label>
                                  <Textarea
                                    value={material.description}
                                    onChange={(e) => handleMaterialChange(material.id, "description", e.target.value)}
                                    placeholder="Mô tả chi tiết về nội dung và mục tiêu của tài liệu..."
                                    rows={3}
                                    className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 resize-none"
                                  />
                                </div>

                                {/* File Upload */}
                                <div className="space-y-2">
                                  <Label className="text-purple-800 font-medium">File PDF</Label>
                                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                                    {material.file ? (
                                      <div className="space-y-2">
                                        <FileText className="h-8 w-8 text-purple-600 mx-auto" />
                                        <p className="text-sm font-medium text-purple-700">{material.file.name}</p>
                                        <p className="text-xs text-purple-500">
                                          {(material.file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                        <Button
                                          type="button"
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleFileSelect(material.id, null)}
                                          className="text-red-600 border-red-300 hover:bg-red-50"
                                        >
                                          Xóa file
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="space-y-2">
                                        <Upload className="h-8 w-8 text-purple-400 mx-auto" />
                                        <p className="text-sm text-purple-600 font-medium">Tải lên file PDF</p>
                                        <p className="text-xs text-purple-500">Chỉ nhận file PDF, tối đa 10MB</p>
                                        <label htmlFor={`file-${material.id}`} className="cursor-pointer">
                                          <span className="text-sm text-purple-600 hover:text-purple-700 font-medium underline">
                                            Choose File
                                          </span>
                                          <input
                                            id={`file-${material.id}`}
                                            type="file"
                                            className="hidden"
                                            accept=".pdf"
                                            onChange={(e) => {
                                              const file = e.target.files?.[0] || null
                                              handleFileSelect(material.id, file)
                                            }}
                                          />
                                        </label>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
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
                  Tạo bài học
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
