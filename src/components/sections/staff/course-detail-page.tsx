"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Users, BookOpen, Star, ChevronDown, ChevronRight, Plus, Clock } from "lucide-react"
import type { Subject } from "./entity"

interface CourseDetailPageProps {
  course: Subject
  onBack: () => void
}

export function CourseDetailPage({ course, onBack }: CourseDetailPageProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([1]))

  const toggleChapter = (chapterId: number) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "N1":
        return "bg-red-600 text-white"
      case "N2":
        return "bg-blue-600 text-white"
      case "N3":
        return "bg-orange-600 text-white"
      case "N4":
        return "bg-purple-600 text-white"
      case "N5":
        return "bg-green-600 text-white"
      case "Cơ bản":
        return "bg-emerald-600 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="p-2 hover:bg-blue-100 text-blue-600">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="text-sm text-blue-600">
                <span>Quay lại</span>
                <span className="mx-2">&gt;</span>
                <span>Quản lý khóa học tiếng Nhật</span>
                <span className="mx-2">&gt;</span>
                <span className="text-blue-900 font-medium">Chi tiết khóa học</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Button>
              <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Course Info */}
          <div className="lg:col-span-1">
            <Card className="mb-6 shadow-lg border-blue-200">
              <CardContent className="p-6">
                {/* Course Logo */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <img src="/placeholder.svg?height=64&width=64" alt="Daruma" className="w-12 h-12 rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-blue-600 font-medium">{course.topic}</span>
                      <Badge className={`${getLevelColor(course.level)} text-xs font-medium`}>{course.level}</Badge>
                    </div>
                    <h1 className="text-xl font-bold text-blue-900">{course.title}</h1>
                    <p className="text-sm text-blue-600">Tiếng Nhật cơ bản</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-blue-900 border-b border-blue-200 pb-2">Thống kê</h3>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Số bài học</span>
                    </div>
                    <span className="font-semibold text-blue-900">{course.lessonCount || 45}</span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Học viên</span>
                    </div>
                    <span className="font-semibold text-blue-900">
                      {(course.studentCount || 2850).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-blue-700">Đánh giá</span>
                    </div>
                    <span className="font-semibold text-blue-900">{course.rating || 4.9}/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-6 shadow-lg border-blue-200">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-blue-900 mb-4 border-b border-blue-200 pb-2">
                  Mô tả khóa học
                </h2>
                <p className="text-blue-700 leading-relaxed">{course.description}</p>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card className="shadow-lg border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6 border-b border-blue-200 pb-4">
                  <h2 className="text-lg font-semibold text-blue-900">Nội dung khóa học</h2>
                  <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {course.chapters.length} chương • {course.estimatedDuration}
                  </span>
                </div>

                <div className="space-y-3">
                  {course.chapters.map((chapter, index) => (
                    <div key={chapter.id} className="border border-blue-200 rounded-lg hover:shadow-md transition-all">
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50 transition-colors rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium min-w-[2rem] text-center">
                            {index + 1}
                          </span>
                          <div>
                            <h3 className="font-medium text-blue-900">{chapter.title}</h3>
                            <p className="text-sm text-blue-600">
                              {chapter.lessonCount || Math.floor(Math.random() * 10) + 5} bài học •{" "}
                              {chapter.duration || `${Math.floor(Math.random() * 20) + 10} giờ`}
                            </p>
                          </div>
                        </div>
                        {expandedChapters.has(chapter.id) ? (
                          <ChevronDown className="h-5 w-5 text-blue-400" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-blue-400" />
                        )}
                      </button>

                      {expandedChapters.has(chapter.id) && (
                        <div className="border-t border-blue-200 p-4 bg-blue-50">
                          <div className="space-y-3">
                            {/* Sample lessons */}
                            {[1, 2, 3].map((lessonNum) => (
                              <div
                                key={lessonNum}
                                className="flex items-center gap-3 py-2 hover:bg-white rounded-md px-2 transition-colors"
                              >
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-xs text-white">{lessonNum}</span>
                                </div>
                                <span className="text-sm text-blue-700">
                                  {lessonNum === 1 && "Từ vựng chữ cái cơ bản"}
                                  {lessonNum === 2 && "Ngữ pháp nền tảng"}
                                  {lessonNum === 3 && "Bài đọc ngắn"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Actions */}
          <div className="lg:col-span-1">
            <Card className="mb-6 shadow-lg border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-4 border-b border-blue-200 pb-2">Thêm chương mới</h3>
                <Button className="w-full mb-3 bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm chương mới
                </Button>

                <div className="border-t border-blue-200 pt-4">
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-100">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm bài học mới
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Duration */}
            <Card className="shadow-lg border-blue-200 mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-4 border-b border-blue-200 pb-2">Thời lượng khóa học</h3>
                <div className="flex items-center gap-2 text-blue-700 bg-blue-50 p-3 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{course.estimatedDuration}</span>
                </div>
              </CardContent>
            </Card>

            {/* Additional Stats */}
            <Card className="shadow-lg border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-4 border-b border-blue-200 pb-2">Thông tin thêm</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600">Giảng viên:</span>
                    <span className="text-sm font-medium text-blue-900">{course.creatorId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600">Trạng thái:</span>
                    <Badge className="bg-blue-600 text-white text-xs">{course.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600">Thứ tự:</span>
                    <span className="text-sm font-medium text-blue-900">#{course.orderNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
