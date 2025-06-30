"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  ImageIcon,
  Headphones,
  BookOpen,
  Lightbulb,
} from "lucide-react"

interface QuizQuestion {
  id: number
  type: "text" | "image" | "audio" | "pdf"
  skill: "kanji" | "vocabulary" | "grammar" | "reading" | "listening"
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
}

interface QuizAnswerReviewProps {
  questions: QuizQuestion[]
  answers: Record<number, number>
  onBack: () => void
}

export default function QuizAnswerReview({ questions, answers, onBack }: QuizAnswerReviewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "pdf":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getQuestionTypeName = (type: string) => {
    switch (type) {
      case "image":
        return "Hình ảnh"
      case "audio":
        return "Nghe"
      case "pdf":
        return "Đọc hiểu"
      default:
        return "Văn bản"
    }
  }

  const currentQ = questions[currentQuestion]
  const userAnswer = answers[currentQ.id]
  const isCorrect = userAnswer === currentQ.correctAnswer
  const hasAnswered = userAnswer !== undefined

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Quay lại kết quả</span>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Xem đáp án chi tiết</h1>
                  <p className="text-gray-600">
                    Câu {currentQuestion + 1} / {questions.length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {isCorrect ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Đúng
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">
                    <XCircle className="h-3 w-3 mr-1" />
                    {hasAnswered ? "Sai" : "Chưa trả lời"}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {getQuestionIcon(currentQ.type)}
                  <Badge variant="outline">{getQuestionTypeName(currentQ.type)}</Badge>
                </div>
                <CardTitle className="text-lg">{currentQ.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Media Content */}
                {currentQ.type === "image" && currentQ.content?.imageUrl && (
                  <div className="flex justify-center">
                    <img
                      src={currentQ.content.imageUrl || "/placeholder.svg"}
                      alt="Question image"
                      className="max-w-full h-auto rounded-lg border shadow-sm"
                      style={{ maxHeight: "400px" }}
                    />
                  </div>
                )}

                {currentQ.type === "audio" && currentQ.content?.audioUrl && (
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Headphones className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">File âm thanh đã được phát trong bài kiểm tra</p>
                  </div>
                )}

                {currentQ.type === "pdf" && currentQ.content?.pdfUrl && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-600">Tài liệu đọc hiểu</span>
                    </div>
                    <iframe
                      src={currentQ.content.pdfUrl}
                      className="w-full h-64 border rounded"
                      title="Reading material"
                    />
                  </div>
                )}

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => {
                    const isUserAnswer = userAnswer === index
                    const isCorrectAnswer = currentQ.correctAnswer === index

                    let optionClass = "w-full p-4 text-left border rounded-lg "
                    if (isCorrectAnswer) {
                      optionClass += "border-green-500 bg-green-50 text-green-900"
                    } else if (isUserAnswer && !isCorrectAnswer) {
                      optionClass += "border-red-500 bg-red-50 text-red-900"
                    } else {
                      optionClass += "border-gray-200 bg-gray-50"
                    }

                    return (
                      <div key={index} className={optionClass}>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {isCorrectAnswer && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {isUserAnswer && !isCorrectAnswer && <XCircle className="h-5 w-5 text-red-600" />}
                            <span className="font-medium text-gray-700">{String.fromCharCode(65 + index)}.</span>
                          </div>
                          <span className="flex-1">{option}</span>
                          {isCorrectAnswer && (
                            <Badge className="bg-green-100 text-green-800 text-xs">Đáp án đúng</Badge>
                          )}
                          {isUserAnswer && !isCorrectAnswer && (
                            <Badge className="bg-red-100 text-red-800 text-xs">Bạn chọn</Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Explanation */}
            {currentQ.explanation && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-900">
                    <Lightbulb className="h-5 w-5" />
                    <span>Giải thích</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 leading-relaxed">{currentQ.explanation}</p>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Câu trước</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === questions.length - 1}
                className="flex items-center space-x-2"
              >
                <span>Câu tiếp</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Danh sách câu hỏi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {questions.map((q, index) => {
                    const userAns = answers[q.id]
                    const isCorrectAns = userAns === q.correctAnswer
                    const hasAns = userAns !== undefined

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-colors ${
                          currentQuestion === index
                            ? "border-blue-500 bg-blue-500 text-white"
                            : isCorrectAns
                              ? "border-green-500 bg-green-50 text-green-700"
                              : hasAns
                                ? "border-red-500 bg-red-50 text-red-700"
                                : "border-gray-300 bg-gray-50 text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Câu đúng:</span>
                  <span className="font-medium text-green-600">
                    {
                      Object.entries(answers).filter(([qId, ans]) => {
                        const q = questions.find((question) => question.id === Number.parseInt(qId))
                        return q?.correctAnswer === ans
                      }).length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Câu sai:</span>
                  <span className="font-medium text-red-600">
                    {
                      Object.entries(answers).filter(([qId, ans]) => {
                        const q = questions.find((question) => question.id === Number.parseInt(qId))
                        return q?.correctAnswer !== ans
                      }).length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Chưa trả lời:</span>
                  <span className="font-medium text-gray-600">{questions.length - Object.keys(answers).length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
