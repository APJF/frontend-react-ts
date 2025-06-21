"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  FileText,
  Download,
  Play,
  Volume2,
  Star,
  ChevronRight,
  Menu,
  X,
  Home,
  User,
  Settings,
} from "lucide-react"

interface Lesson {
  id: string
  title: string
  level: string
  description: string
  fileUrl: string
  duration: string
  completed: boolean
}

const lessons: Lesson[] = [
  {
    id: "1",
    title: "Đề N3 T7-2023 - もじ・ごい (Chữ cái & Từ vựng)",
    level: "N3",
    description: "Đề thi thực tế JLPT N3 tháng 7/2023 - Phần chữ cái và từ vựng (30 phút)",
    fileUrl: "https://drive.google.com/file/d/1PAuqDd2AHy3QWmJWCgd5udlXvtfDUBIW/preview",
    duration: "30 phút",
    completed: false,
  },
  {
    id: "2",
    title: "カタカナ基礎 (Katakana Cơ Bản)",
    level: "N5",
    description: "Học cách viết và đọc bảng chữ cái Katakana",
    fileUrl: "https://drive.google.com/file/d/2example/preview",
    duration: "25 phút",
    completed: true,
  },
  {
    id: "3",
    title: "基本挨拶 (Chào Hỏi Cơ Bản)",
    level: "N5",
    description: "Các cách chào hỏi thông dụng trong tiếng Nhật",
    fileUrl: "https://drive.google.com/file/d/3example/preview",
    duration: "20 phút",
    completed: false,
  },
  {
    id: "4",
    title: "数字と時間 (Số Đếm và Thời Gian)",
    level: "N4",
    description: "Học cách đếm số và nói về thời gian",
    fileUrl: "https://drive.google.com/file/d/4example/preview",
    duration: "40 phút",
    completed: false,
  },
  {
    id: "5",
    title: "家族の紹介 (Giới Thiệu Gia Đình)",
    level: "N4",
    description: "Từ vựng và cách giới thiệu về gia đình",
    fileUrl: "https://drive.google.com/file/d/5example/preview",
    duration: "35 phút",
    completed: false,
  },
]

export default function JapaneseLearningPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(lessons[0])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "N5":
        return "bg-red-100 text-red-800 border-red-200"
      case "N4":
        return "bg-red-200 text-red-900 border-red-300"
      case "N3":
        return "bg-red-300 text-red-950 border-red-400"
      default:
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-red-700"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center gap-2">
                <BookOpen className="h-8 w-8" />
                <div>
                  <h1 className="text-2xl font-bold">日本語学習</h1>
                  <p className="text-red-100 text-sm">Học Tiếng Nhật Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
                <Home className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`lg:col-span-1 ${sidebarOpen ? "block" : "hidden lg:block"}`}>
            <Card className="border-red-200 shadow-lg">
              <CardHeader className="bg-red-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Danh Sách Bài Học
                </CardTitle>
                <CardDescription className="text-red-100">Chọn bài học để bắt đầu</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-4 border-b border-red-100 cursor-pointer transition-colors hover:bg-red-50 ${
                        selectedLesson.id === lesson.id ? "bg-red-100 border-l-4 border-l-red-500" : ""
                      }`}
                      onClick={() => {
                        setSelectedLesson(lesson)
                        setSidebarOpen(false)
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm leading-tight">{lesson.title}</h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{lesson.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={`text-xs ${getLevelColor(lesson.level)}`}>{lesson.level}</Badge>
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          {lesson.completed && <Star className="h-4 w-4 text-red-500 fill-current" />}
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-red-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedLesson.title}</CardTitle>
                    <CardDescription className="text-red-100 mt-2">{selectedLesson.description}</CardDescription>
                  </div>
                  <Badge className={`${getLevelColor(selectedLesson.level)} bg-white`}>{selectedLesson.level}</Badge>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-red-100">
                    <Play className="h-4 w-4" />
                    <span className="text-sm">{selectedLesson.duration}</span>
                  </div>
                  {selectedLesson.completed && (
                    <div className="flex items-center gap-2 text-red-100">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">Đã hoàn thành</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Play className="h-4 w-4 mr-2" />
                    Bắt Đầu Học
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                    <Download className="h-4 w-4 mr-2" />
                    Tải Xuống
                  </Button>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Nghe Audio
                  </Button>
                </div>

                <Separator className="mb-6" />

                {/* Document Viewer */}
                <div className="bg-white rounded-lg border-2 border-red-200 overflow-hidden">
                  <div className="bg-red-500 text-white p-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Tài Liệu Bài Học
                    </h3>
                  </div>
                  <div className="aspect-[4/3] bg-gray-50">
                    <iframe
                      src={selectedLesson.fileUrl}
                      className="w-full h-full border-0"
                      title={`Tài liệu: ${selectedLesson.title}`}
                      allow="autoplay"
                    />
                  </div>
                </div>

                {/* Study Notes */}
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Hướng Dẫn Làm Bài
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Thời gian làm bài: 30 phút cho phần chữ cái và từ vựng</li>
                    <li>• Đọc kỹ đề bài và các lựa chọn trước khi chọn đáp án</li>
                    <li>• Chú ý cách đọc Kanji và ý nghĩa của từ vựng</li>
                    <li>• Luyện tập thường xuyên với các đề thi thực tế</li>
                    <li>• Đáp án đúng được đánh dấu bằng vòng tròn đỏ trong file</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
