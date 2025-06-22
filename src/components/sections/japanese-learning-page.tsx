"use client"

import { useEffect, useState } from "react"
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
import { useAPI } from "@/hooks/useAPI"
import { useNavigate, useParams } from "react-router-dom"
import URLMapping from "@/utils/URLMapping"

interface SlotData {
  id: number
  slotNumber: number
  title: string
  date: string
  time: string
  duration: string
  location: string
  description: string
  materials: Material[]
}

interface Material {
  id: string
  name: string
  type: "vocabulary" | "kanji" | "grammar" | "listening" | "reading";
  description: string
  duration: string
  difficulty: "Dễ" | "Trung bình" | "Khó"
  progress: number
  isCompleted: boolean
  isLocked: boolean
  exercises: number
  points: number
  color: string
}

export default function JapaneseLearningPage() {
  const [slotData, setSlotData] = useState<SlotData | null>(null)
  const [slotSkills, setSlotSkill] = useState<any[]>([]);
  const { API } = useAPI();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const response = await API.get(URLMapping.SLOT_SKILL + `/${id}`);
    console.log(response);
    setSlotData(response);
    setSlotSkill([response]);
  };

  function getLevelColor(level: any) {
    throw new Error("Function not implemented.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`lg:col-span-1`}>
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
                  {slotData?.materials.map((lesson: Material) => (
                    <div
                      key={lesson.id}
                      className={`p-4 border-b border-red-100 cursor-pointer transition-colors hover:bg-red-50 ${lesson.id === lesson.id ? "bg-red-100 border-l-4 border-l-red-500" : ""
                        }`}

                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm leading-tight">{lesson.name}</h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{lesson.description}</p>
                          {/* <div className="flex items-center gap-2 mt-2">
                            <Badge className={`text-xs ${getLevelColor(lesson.level)}`}>{lesson.level}</Badge>
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                          </div> */}
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          {lesson.isCompleted && <Star className="h-4 w-4 text-red-500 fill-current" />}
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
            {slotData?.materials.map((lesson: Material) => (
              <Card className="border-red-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{lesson.name}</CardTitle>
                      <CardDescription className="text-red-100 mt-2">{lesson.description}</CardDescription>
                    </div>
                    {/* <Badge className={`${getLevelColor(lesson.level)} bg-white`}>{lesson.level}</Badge> */}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-red-100">
                      <Play className="h-4 w-4" />
                      <span className="text-sm">{lesson.duration}</span>
                    </div>
                    {lesson.isCompleted && (
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
                        src={lesson.description}
                        className="w-full h-full border-0"
                        title={`Tài liệu: ${lesson.name}`}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
