"use client"

import type React from "react"

import { useNavigate,useParams,useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  Eye,
  PenTool,
  CheckCircle,
  Clock,
  Target,
  Play,
  Lock,
  Star,
  Trophy,
  Calendar,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import  URLMapping from "@/utils/URLMapping"
import { useAPI } from "@/hooks/useAPI"

interface SlotData {
  id: number
  slotNumber: number
  title: string
  date: string
  time: string
  duration: string
  location: string
  description: string
}

interface Skill {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
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

const skillsData: Skill[] = [
  {
    id: "vocabulary",
    name: "Từ vựng",
    icon: BookOpen,
    description: "Học 50 từ vựng mới về chủ đề gia đình và nghề nghiệp",
    duration: "25 phút",
    difficulty: "Dễ",
    progress: 85,
    isCompleted: false,
    isLocked: false,
    exercises: 12,
    points: 150,
    color: "bg-blue-500",
  },
  {
    id: "grammar",
    name: "Ngữ pháp",
    icon: PenTool,
    description: "Cấu trúc ngữ pháp: です/である và cách sử dụng",
    duration: "30 phút",
    difficulty: "Trung bình",
    progress: 60,
    isCompleted: false,
    isLocked: false,
    exercises: 8,
    points: 200,
    color: "bg-green-500",
  },
  {
    id: "reading",
    name: "Luyện đọc",
    icon: Eye,
    description: "Đọc hiểu đoạn văn ngắn về văn hóa Nhật Bản",
    duration: "20 phút",
    difficulty: "Trung bình",
    progress: 0,
    isCompleted: false,
    isLocked: true,
    exercises: 6,
    points: 180,
    color: "bg-purple-500",
  },
  {
    id: "listening",
    name: "Luyện nghe",
    icon: Volume2,
    description: "Nghe hội thoại cơ bản và trả lời câu hỏi",
    duration: "15 phút",
    difficulty: "Khó",
    progress: 0,
    isCompleted: false,
    isLocked: true,
    exercises: 10,
    points: 220,
    color: "bg-orange-500",
  },
  {
    id: "exercises",
    name: "Bài tập",
    icon: Target,
    description: "Tổng hợp kiến thức với các bài tập thực hành",
    duration: "35 phút",
    difficulty: "Khó",
    progress: 0,
    isCompleted: false,
    isLocked: true,
    exercises: 15,
    points: 300,
    color: "bg-red-500",
  },
]

export default function SlotSkills() {
  const searchParams = useSearchParams()
  const router = useNavigate()
  const [slotData, setSlotData] = useState<SlotData | null>(null)
  const [skills, setSkills] = useState<Skill[]>(skillsData)
  const { API } = useAPI();
  const { id } = useParams();

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    const response = await API.get(URLMapping.SLOT_SKILL+`/${id}`);
    console.log(response);
    setSlotData(response);
  };

  const handleSkillClick = (skill: Skill) => {
    if (skill.isLocked) {
      alert("Bạn cần hoàn thành kỹ năng trước đó để mở khóa!")
      return
    }

    // Navigate to skill detail or start learning
    alert(`Bắt đầu học: ${skill.name}`)
  }

  const totalProgress = Math.round(skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length)
  const completedSkills = skills.filter((skill) => skill.isCompleted).length
  const totalPoints = skills.reduce((acc, skill) => acc + (skill.isCompleted ? skill.points : 0), 0)

  if (!slotData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🇯🇵</div>
          <p className="text-gray-600">Đang tải thông tin slot...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại lịch học
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {slotData.slotNumber}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{slotData.title}</h1>
              </div>
              <p className="text-gray-600 mb-4">{slotData.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{slotData.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {slotData.time} ({slotData.duration})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{slotData.location}</span>
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="flex gap-4">
              <div className="bg-white border border-red-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{totalProgress}%</div>
                <div className="text-sm text-gray-600">Tiến độ</div>
              </div>
              <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {completedSkills}/{skills.length}
                </div>
                <div className="text-sm text-gray-600">Hoàn thành</div>
              </div>
              <div className="bg-white border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
                <div className="text-sm text-gray-600">Điểm</div>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Tiến độ tổng thể</span>
              <span className="text-sm text-gray-500">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <Card
                key={skill.id}
                className={`overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  skill.isLocked
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:shadow-xl border-red-100 hover:border-red-200"
                } ${skill.isCompleted ? "ring-2 ring-green-500" : ""}`}
                onClick={() => handleSkillClick(skill)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-full ${skill.color} flex items-center justify-center`}>
                      {skill.isLocked ? (
                        <Lock className="h-6 w-6 text-white" />
                      ) : skill.isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <IconComponent className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {skill.isCompleted && <Trophy className="h-5 w-5 text-yellow-500" />}
                      <Badge
                        className={
                          skill.difficulty === "Dễ"
                            ? "bg-green-100 text-green-700"
                            : skill.difficulty === "Trung bình"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }
                      >
                        {skill.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <CardTitle className="text-xl mb-2">{skill.name}</CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-2">{skill.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Tiến độ</span>
                      <span className="text-sm text-gray-500">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium">{skill.duration}</div>
                      <div className="text-xs text-gray-500">Thời gian</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <Target className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium">{skill.exercises}</div>
                      <div className="text-xs text-gray-500">Bài tập</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <Star className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium">{skill.points}</div>
                      <div className="text-xs text-gray-500">Điểm</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className={`w-full ${
                      skill.isLocked
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : skill.isCompleted
                          ? "bg-green-600 hover:bg-green-700"
                          : skill.progress > 0
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-red-600 hover:bg-red-700"
                    }`}
                    disabled={skill.isLocked}
                  >
                    {skill.isLocked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Đã khóa
                      </>
                    ) : skill.isCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Đã hoàn thành
                      </>
                    ) : skill.progress > 0 ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Tiếp tục
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Bắt đầu
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Learning Path */}
        <div className="mt-12">
          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-red-600" />
                Lộ trình học tập
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">Hoàn thành các kỹ năng theo thứ tự để mở khóa kỹ năng tiếp theo:</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div key={skill.id} className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          skill.isCompleted
                            ? "bg-green-500 text-white"
                            : skill.isLocked
                              ? "bg-gray-300 text-gray-500"
                              : skill.color + " text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className={`text-sm ${skill.isLocked ? "text-gray-400" : "text-gray-700"}`}>
                        {skill.name}
                      </span>
                      {index < skills.length - 1 && <span className="text-gray-400">→</span>}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Achievement Banner */}
      <div className="bg-red-600 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🏆 Hoàn thành slot để nhận thưởng!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex flex-col items-center">
                <Trophy className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Huy chương</h3>
                <p className="text-sm opacity-90">Nhận huy chương khi hoàn thành 100%</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Điểm thưởng</h3>
                <p className="text-sm opacity-90">Tích lũy điểm để đổi quà</p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Chứng chỉ</h3>
                <p className="text-sm opacity-90">Chứng chỉ hoàn thành slot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
