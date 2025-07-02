"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Star,
  ChevronDown,
  ChevronRight,
  Plus,
  Clock,
  Play,
  FileText,
  Award,
  Target,
} from "lucide-react"
import type { Subject } from "../entity"
import { useNavigate } from "react-router-dom"

interface CourseDetailLayoutPageProps {
  course: Subject
  onBack: () => void
}

export function CourseDetailLayoutPage({ course, onBack }: CourseDetailLayoutPageProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([1]))
  const navigate = useNavigate();

  const toggleChapter = (chapterId: number) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  // Sample chapter data based on the image
  const sampleChapters = [
    {
      id: 1,
      title: "Hiragana - Bảng chữ cái cơ bản",
      lessonCount: 8,
      duration: "15 giờ",
      lessons: ["Slot 1: Từ vựng chữ cái chính", "Slot 2: Ngữ pháp nền tảng", "Slot 3: Bài đọc ngắn"],
    },
    {
      id: 2,
      title: "Katakana - Bảng chữ cái người lại",
      lessonCount: 8,
      duration: "15 giờ",
      lessons: [],
    },
    {
      id: 3,
      title: "Kanji cơ bản N5",
      lessonCount: 12,
      duration: "25 giờ",
      lessons: [],
    },
    {
      id: 4,
      title: "Ngữ pháp N5",
      lessonCount: 15,
      duration: "30 giờ",
      lessons: [],
    },
    {
      id: 5,
      title: "Từ vựng và Giao tiếp N5",
      lessonCount: 10,
      duration: "20 giờ",
      lessons: [],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={()=> window.history.back()} className="p-2 hover:bg-blue-100 text-blue-600 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center text-sm text-blue-600">
                <span className="hover:text-blue-800 cursor-pointer">Quay lại</span>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="hover:text-blue-800 cursor-pointer">Quản lý khóa học tiếng Nhật</span>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-blue-900 font-medium">Chi tiết khóa học</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={ ()=> navigate(`/addchapter`)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Thêm chương
              </Button>
              <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent">
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Button>
              <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Course Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                {/* Course Logo and Title */}
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-white font-bold text-lg">
                      <div className="text-xs">DARUMA</div>
                      <div className="text-sm">日本語</div>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-blue-900 mb-2">{course.title}</h1>
                  <p className="text-blue-600 font-medium">Tiếng Nhật cơ bản</p>
                </div>

                {/* Stats Section */}
                <div className="space-y-6">
                  <div className="border-b border-blue-100 pb-4">
                    <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Thống kê
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-600 p-2 rounded-lg">
                            <BookOpen className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-blue-700 font-medium">Số bài học</span>
                        </div>
                        <span className="text-2xl font-bold text-blue-900">45</span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-600 p-2 rounded-lg">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-green-700 font-medium">Học viên</span>
                        </div>
                        <span className="text-2xl font-bold text-green-900">2,850</span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-yellow-600 p-2 rounded-lg">
                            <Star className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-yellow-700 font-medium">Đánh giá</span>
                        </div>
                        <span className="text-2xl font-bold text-yellow-900">4.9/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Course Description */}
            <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                    Mô tả khóa học
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                </div>
                <p className="text-blue-700 leading-relaxed text-lg">
                  Khóa học tiếng Nhật N5 dành cho người mới bắt đầu, giúp bạn nắm vững các kiến thức cơ bản nhất của
                  tiếng Nhật như Hiragana, Katakana, 100 chữ Kanji cơ bản, và các cấu trúc ngữ pháp cơ bản. Khóa học
                  được thiết kế để thân thiện với người mới học, tuyệt vời để chuẩn bị cho kỳ thi năng lực tiếng Nhật
                  N5.
                </p>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <Award className="h-6 w-6 text-blue-600" />
                        Nội dung khóa học
                      </h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-600 font-medium">
                        {sampleChapters.length} chương • {course.estimatedDuration}
                      </div>
                      <div className="text-xs text-blue-500">
                        {sampleChapters.reduce((total, chapter) => total + chapter.lessonCount, 0)} bài học
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {sampleChapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      className="border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-blue-50/30"
                    >
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50/50 transition-colors rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-blue-900 text-lg mb-1">{chapter.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-blue-600">
                              <div className="flex items-center gap-1">
                                <Play className="h-4 w-4" />
                                <span>{chapter.lessonCount} bài học</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{chapter.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                            onClick={() => navigate(`/addunit`) }
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Thêm bài học
                          </Button>
                          {expandedChapters.has(chapter.id) ? (
                            <ChevronDown className="h-6 w-6 text-blue-400" />
                          ) : (
                            <ChevronRight className="h-6 w-6 text-blue-400" />
                          )}
                        </div>
                      </button>

                      {expandedChapters.has(chapter.id) && (
                        <div className="border-t border-blue-200 bg-blue-50/30">
                          <div className="p-6 space-y-3">
                            {chapter.lessons.length > 0 ? (
                              chapter.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lessonIndex}
                                  className="flex items-center gap-3 py-3 px-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-all"
                                >
                                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-xs text-white font-medium">{lessonIndex + 1}</span>
                                  </div>
                                  <span className="text-blue-700 font-medium">{lesson}</span>
                                  <div className="ml-auto flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs border-blue-300 text-blue-600">
                                      5 phút
                                    </Badge>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-100">
                                      <Play className="h-3 w-3 text-blue-600" />
                                    </Button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center py-8">
                                <div className="text-blue-400 mb-3">
                                  <BookOpen className="h-12 w-12 mx-auto opacity-50" />
                                </div>
                                <p className="text-blue-600 font-medium mb-2">Chưa có bài học nào</p>
                                <p className="text-sm text-blue-500 mb-4">Thêm bài học đầu tiên cho chương này</p>
                                <Button  onClick={() => navigate(`/addunit`) } size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                  <Plus className="h-4 w-4 mr-2" />
                                  Thêm bài học
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add New Chapter Button */}
                <div className="mt-8 pt-6 border-t border-blue-200">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-medium shadow-lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Thêm chương mới
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
