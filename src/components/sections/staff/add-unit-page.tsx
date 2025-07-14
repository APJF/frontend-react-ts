"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
import type { Course, Chapter } from "../entity"
import { useNavigate, useLocation } from "react-router-dom"

interface AddLessonPageProps {
  course: Course
  chapter: Chapter
  onBack: () => void
  onCreateLesson: (lessonData: {
    unitId: string
    unitDescription: string
    prerequisiteUnit: string
    chapterId: number
    materials: Array<{
      skill: string
      name: string
      description: string
      url: string
    }>
  }) => void
}

export function AddLessonPage(props: AddLessonPageProps) {
  // Sử dụng trực tiếp props đã được truyền vào từ AddNewUnit component
  const { course, chapter } = props;
  
  console.log("AddLessonPage loaded with data:", { 
    chapter, 
    course,
    propsChapter: props.chapter, 
    propsCourse: props.course 
  });

  const [formData, setFormData] = useState({
    unitId: "",
    title: "",
    unitDescription: "",
    prerequisiteUnit: "",
  })

  const [materials, setMaterials] = useState([
    {
      id: 1,
      skill: "",
      name: "",
      description: "",
      url: "",
      expanded: true,
    },
  ])

  // Sử dụng chapter trực tiếp thay vì lưu vào state riêng
  // Tính số thứ tự chương trong mảng
  const chapterIndex = course?.chapters?.findIndex((c: Chapter) => c.id === chapter?.id) ?? -1;
  const chapterOrder = chapterIndex >= 0 ? chapterIndex + 1 : "";

  const skillTypes = [
    { value: "vocabulary", label: "Từ vựng" },
    { value: "kanji", label: "Kanji" },
    { value: "grammar", label: "Ngữ pháp" },
    { value: "reading", label: "Đọc hiểu" },
    { value: "listening", label: "Nghe hiểu" },
  ]

  const navigate = useNavigate()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMaterialChange = (id: number, field: string, value: string) => {
    setMaterials((prev) => prev.map((material) => (material.id === id ? { ...material, [field]: value } : material)))
  }

  const addMaterial = () => {
    const newId = Math.max(...materials.map((m) => m.id)) + 1
    setMaterials((prev) => [
      ...prev,
      {
        id: newId,
        skill: "",
        name: "",
        description: "",
        url: "",
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

  const isFormValid =
    formData.unitId.trim() &&
    formData.title.trim() &&
    formData.unitDescription.trim() &&
    materials.every((m) => m.skill && m.name.trim() && m.url.trim())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting form with chapter ID:", chapter?.id);
    
    // Chuẩn bị payload gửi backend
    const payload = {
      id: formData.unitId,
      title: formData.title,
      description: formData.unitDescription,
      status: "DRAFT",
      chapterId: chapter.id, // Sử dụng trực tiếp từ props
      prerequisiteUnitId: formData.prerequisiteUnit || null,
    };
    
    console.log("Payload to send:", payload);
    
    try {
      const response = await fetch("http://localhost:8080/api/units", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": "staff-01",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        alert("Tạo bài học thành công!")
        navigate(-1) // Quay lại trang chi tiết chương
      } else {
        alert(data.message || "Tạo bài học thất bại!")
      }
    } catch (err) {
      console.error("Error creating unit:", err);
      alert("Lỗi kết nối server!")
    }
  }

  // Loại bỏ useEffect không cần thiết vì chúng ta đã có dữ liệu từ props
  // và đã xử lý trực tiếp trong AddNewUnit component
  
  // Thêm useEffect để kiểm tra và log thông tin khi component render
  useEffect(() => {
    console.log("AddLessonPage rendered with chapter:", chapter);
    console.log("AddLessonPage rendered with course:", course);
    
    // Kiểm tra nếu thiếu thông tin cần thiết
    if (!chapter || !chapter.id) {
      console.error("Missing chapter information");
    }
    if (!course || !course.id) {
      console.error("Missing course information");
    }
  }, [chapter, course])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={props.onBack}
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
                      <Badge className="bg-blue-600 text-white font-mono text-xs">{course.id}</Badge>
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
                    <Badge className="bg-purple-600 text-white text-xs mb-2">Chapter - {chapterOrder}</Badge>
                  </div>

                  <div className="mb-4">
                    <div className="text-purple-600 font-medium text-xs mb-1">TÊN CHƯƠNG</div>
                    <h4 className="text-purple-900 font-bold text-sm leading-tight">{chapter.title}</h4>
                  </div>

                  <div className="mb-4">
                    <div className="text-purple-600 font-medium text-xs mb-1">THỨ TỰ CHƯƠNG</div>
                    <div className="text-purple-900 font-semibold">Chương {chapterOrder}</div>
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
            <form
              className="space-y-8"
              onSubmit={handleSubmit}
            >
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
                    {/* Unit ID */}
                    <div className="space-y-3">
                      <Label htmlFor="unitId" className="text-blue-800 font-semibold text-base flex items-center gap-2">
                        Mã bài học <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="unitId"
                        value={formData.unitId}
                        onChange={(e) => handleInputChange("unitId", e.target.value)}
                        placeholder="Ví dụ: UNIT01"
                        className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-base py-3 bg-white/80 backdrop-blur-sm"
                        required
                      />
                    </div>
                    {/* Unit Name */}
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
                  </div>
                  {/* Unit Description */}
                  <div className="space-y-3 mt-6">
                    <Label htmlFor="unitDescription" className="text-blue-800 font-semibold text-base flex items-center gap-2">
                      Mô tả bài học <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="unitDescription"
                      value={formData.unitDescription}
                      onChange={(e) => handleInputChange("unitDescription", e.target.value)}
                      placeholder="Mô tả chi tiết về nội dung bài học..."
                      rows={3}
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                      required
                    />
                  </div>
                  {/* Prerequisite Unit */}
                  <div className="space-y-3 mt-6">
                    <Label htmlFor="prerequisiteUnit" className="text-blue-800 font-semibold text-base flex items-center gap-2">
                      Bài học tiên quyết
                    </Label>
                    <Input
                      id="prerequisiteUnit"
                      value={formData.prerequisiteUnit}
                      onChange={(e) => handleInputChange("prerequisiteUnit", e.target.value)}
                      placeholder="Nhập mã bài học tiên quyết (nếu có)"
                      className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 text-base py-3 bg-white/80 backdrop-blur-sm"
                    />
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
                        <h2 className="text-xl font-bold text-blue-900">Kỹ năng trong bài học</h2>
                      </div>
                      <Button
                        type="button"
                        onClick={addMaterial}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Thêm kỹ năng
                      </Button>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                  </div>

                  <div className="space-y-4">
                    {materials.map((material, index) => (
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
                                  Kỹ năng {index + 1}
                                  {material.name && ` - ${material.name}`}
                                </h3>
                                {material.skill && (
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm text-purple-600">
                                      {skillTypes.find((t) => t.value === material.skill)?.label}
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
                              {/* Skill Type */}
                              <div className="space-y-2">
                                <Label className="text-purple-800 font-medium">
                                  Kỹ năng <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                  value={material.skill}
                                  onValueChange={(value) => handleMaterialChange(material.id, "skill", value)}
                                >
                                  <SelectTrigger className="border-purple-300 focus:border-purple-500 focus:ring-purple-500 bg-white">
                                    <SelectValue placeholder="Chọn kỹ năng" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white">
                                    {skillTypes.map((type) => (
                                      <SelectItem key={type.value} value={type.value} className="bg-white">
                                        {type.label}
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

                              {/* Material URL */}
                              <div className="space-y-2">
                                <Label className="text-purple-800 font-medium">
                                  URL tài liệu <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  value={material.url}
                                  onChange={(e) => handleMaterialChange(material.id, "url", e.target.value)}
                                  placeholder="Dán URL tài liệu (Google Drive, v.v.)"
                                  className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                                  required
                                />
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={props.onBack}
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
