"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Trophy,
  Target,
  Clock,
  FileText,
  Eye,
  RotateCcw,
} from "lucide-react"

interface QuizQuestion {
  id: number
  type: "text" | "image" | "audio" | "pdf"
  question: string
  content?: {
    imageUrl?: string
    audioUrl?: string
    pdfUrl?: string
    text?: string
  }
  options: string[]
  correctAnswer: number
  explanation?: string
  skill?: string
}

interface QuizResultsProps {
  score: number
  totalQuestions: number
  timeSpent: string
  answers: Record<number, number>
  questions: QuizQuestion[]
  onRestart: () => void
  onShowAnswers: () => void
}

export default function QuizResults({
  score,
  totalQuestions,
  timeSpent,
  answers,
  questions,
  onRestart,
  onShowAnswers,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getEvaluation = (percent: number) => {
    if (percent < 10) {
      return {
        level: "Cần cải thiện nhiều",
        message: "Bạn cần ôn luyện lại từ đầu và tập trung vào các kiến thức cơ bản.",
        icon: XCircle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        scoreColor: "text-red-600",
        scoreBg: "bg-red-50",
      }
    } else if (percent < 30) {
      return {
        level: "Yếu",
        message: "Bạn cần ôn luyện thêm rất nhiều. Hãy xem lại tài liệu và làm thêm bài tập.",
        icon: XCircle,
        color: "text-red-500",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        scoreColor: "text-red-500",
        scoreBg: "bg-red-50",
      }
    } else if (percent < 50) {
      return {
        level: "Cần cải thiện",
        message: "Bạn đã có tiến bộ nhưng vẫn cần ôn luyện thêm để đạt kết quả tốt hơn.",
        icon: AlertTriangle,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
        scoreColor: "text-orange-600",
        scoreBg: "bg-orange-50",
      }
    } else if (percent < 70) {
      return {
        level: "Trung bình",
        message: "Kết quả ổn nhưng bạn có thể làm tốt hơn. Hãy ôn luyện thêm một chút.",
        icon: Target,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        scoreColor: "text-yellow-600",
        scoreBg: "bg-yellow-50",
      }
    } else if (percent < 90) {
      return {
        level: "Đạt",
        message: "Chúc mừng! Bạn đã đạt kết quả tốt. Tiếp tục duy trì phong độ này.",
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        scoreColor: "text-green-600",
        scoreBg: "bg-green-50",
      }
    } else if (percent < 100) {
      return {
        level: "Giỏi",
        message: "Xuất sắc! Bạn đã thể hiện rất tốt. Chỉ cần một chút nữa là hoàn hảo.",
        icon: Star,
        color: "text-green-700",
        bgColor: "bg-green-100",
        borderColor: "border-green-300",
        scoreColor: "text-green-700",
        scoreBg: "bg-green-100",
      }
    } else {
      return {
        level: "Hoàn hảo",
        message: "Tuyệt vời! Bạn đã đạt điểm tối đa. Kiến thức của bạn rất vững vàng!",
        icon: Trophy,
        color: "text-green-800",
        bgColor: "bg-green-200",
        borderColor: "border-green-400",
        scoreColor: "text-green-800",
        scoreBg: "bg-green-200",
      }
    }
  }

  const evaluation = getEvaluation(percentage)
  const IconComponent = evaluation.icon

  const getTypeIcon = (skill: string) => {
    switch (skill) {
      case "kanji":
        return "漢"
      case "vocabulary":
        return "📚"
      case "grammar":
        return "📝"
      case "reading":
        return "📖"
      case "listening":
        return "🎧"
      default:
        return "📝"
    }
  }

  const getTypeName = (skill: string) => {
    switch (skill) {
      case "kanji":
        return "Kanji"
      case "vocabulary":
        return "Từ vựng"
      case "grammar":
        return "Ngữ pháp"
      case "reading":
        return "Đọc hiểu"
      case "listening":
        return "Nghe"
      default:
        return "Khác"
    }
  }
  // Xác định màu nền dựa trên percentage (giảm độ đậm 50% bằng cách chọn cấp độ màu cao hơn)
  const getBackgroundColor = (percent: number) => {
    if (percent < 10) return "bg-red-50"; // Từ bg-red-50 lên red-100
    if (percent < 30) return "bg-red-50";
    if (percent < 50) return "bg-orange-50"; // Từ bg-orange-50 lên orange-100
    if (percent < 70) return "bg-yellow-50"; // Từ bg-yellow-50 lên yellow-100
    if (percent < 90) return "bg-green-50"; // Từ bg-green-50 lên green-100
    if (percent < 100) return "bg-green-100"; // Từ bg-green-100 lên green-200
    return "bg-green-200"; // Từ bg-green-200 lên green-300
  };
  const backgroundColor = getBackgroundColor(percentage);

  return (
    <div className={`min-h-screen ${backgroundColor} p-6 transition-colors duration-500`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className={`mx-auto w-20 h-20 ${evaluation.bgColor} rounded-full flex items-center justify-center`}>
            <IconComponent className={`h-10 w-10 ${evaluation.color}`} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Kết quả bài kiểm tra</h1>
          <p className="text-gray-600">Bạn đã hoàn thành bài kiểm tra thành công</p>
        </div>

        {/* Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Card */}
          <Card className={`${evaluation.borderColor} border-2`}>
            <CardContent className="p-6 text-center">
              <div className={`text-4xl font-bold ${evaluation.scoreColor} mb-2`}>
                {score}/{totalQuestions}
              </div>
              <p className="text-sm text-gray-600 mb-4">Điểm số</p>
              <div className={`text-3xl font-bold ${evaluation.scoreColor}`}>{percentage}%</div>
            </CardContent>
          </Card>

          {/* Evaluation Card */}
          <Card className={`lg:col-span-2 ${evaluation.borderColor} border-2 ${evaluation.bgColor}`}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <IconComponent className={`h-8 w-8 ${evaluation.color} flex-shrink-0 mt-1`} />
                <div>
                  <h3 className={`text-xl font-bold ${evaluation.color} mb-2`}>{evaluation.level}</h3>
                  <p className="text-gray-700 leading-relaxed">{evaluation.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <p className="text-sm text-gray-600">Câu đúng</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{totalQuestions - score}</div>
              <p className="text-sm text-gray-600">Câu sai</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{timeSpent}</div>
              <p className="text-sm text-gray-600">Thời gian</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Phân tích kết quả</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tỷ lệ đúng</span>
                  <span className={`font-medium ${evaluation.scoreColor}`}>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      percentage < 30
                        ? "bg-red-500"
                        : percentage < 50
                          ? "bg-orange-500"
                          : percentage < 70
                            ? "bg-yellow-500"
                            : percentage < 90
                              ? "bg-green-500"
                              : "bg-green-600"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Question Type Analysis */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {["kanji", "vocabulary", "grammar", "reading", "listening"].map((skill) => {
                  const skillQuestions = questions.filter((q) => q.skill === skill)
                  const skillCorrect = skillQuestions.filter((q) => answers[q.id] === q.correctAnswer).length
                  const skillPercentage =
                    skillQuestions.length > 0 ? Math.round((skillCorrect / skillQuestions.length) * 100) : 0

                  if (skillQuestions.length === 0) return null

                  return (
                    <div key={skill} className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">{getTypeIcon(skill)}</div>
                      <div className="text-sm font-medium text-gray-900">{getTypeName(skill)}</div>
                      <div className="text-lg font-bold text-gray-700">
                        {skillCorrect}/{skillQuestions.length}
                      </div>
                      <div className="text-xs text-gray-600">{skillPercentage}%</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onShowAnswers}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2 bg-white hover:bg-gray-50"
          >
            <Eye className="h-5 w-5" />
            <span>Xem đáp án chi tiết</span>
          </Button>

          <Button onClick={onRestart} size="lg" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
            <RotateCcw className="h-5 w-5" />
            <span>Làm lại bài kiểm tra</span>
          </Button>
        </div>

        {/* Recommendations */}
        {percentage < 70 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <FileText className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Gợi ý ôn luyện</h3>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Xem lại các câu trả lời sai để hiểu rõ lỗi</li>
                    <li>• Ôn luyện thêm các chủ đề yếu</li>
                    <li>• Làm thêm bài tập tương tự</li>
                    <li>• Tham khảo tài liệu học tập bổ sung</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
