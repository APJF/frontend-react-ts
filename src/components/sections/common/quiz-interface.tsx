"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import QuizPreparation from "./quiz-preparation"
import QuizResults from "./quiz-results"
import QuizAnswerReview from "./quiz-answer-review"
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  FileText,
  ImageIcon,
  Headphones,
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
} from "lucide-react"
import { Document, Page } from "react-pdf"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

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

interface QuizInterfaceProps {
  title: string
  description: string
  timeLimit?: number // in minutes
  questions: QuizQuestion[]
  difficulty?: "Dễ" | "Trung bình" | "Khó"
  onSubmit: (answers: Record<number, number>) => void
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "text",
    skill: "vocabulary",
    question: "Từ 'こんにちは' trong tiếng Nhật có nghĩa là gì?",
    options: ["Xin chào", "Tạm biệt", "Cảm ơn", "Xin lỗi"],
    correctAnswer: 0,
    explanation: "'こんにちは' (konnichiwa) là cách chào hỏi phổ biến trong tiếng Nhật, có nghĩa là 'Xin chào'.",
  },
  {
    id: 2,
    type: "image",
    skill: "grammar",
    question: "Hãy chọn từ Hiragana tương ứng với hình ảnh này:",
    content: {
      imageUrl: "/images/question-image.png",
    },
    options: ["あ (a)", "か (ka)", "さ (sa)", "た (ta)"],
    correctAnswer: 1,
    explanation: "Hình ảnh hiển thị ký tự Hiragana 'か' (ka).",
  },
  {
    id: 3,
    type: "audio",
    skill: "listening",
    question: "Nghe đoạn audio và chọn từ đúng:",
    content: {
      audioUrl: "/audio/listening-sample.mp3",
    },
    options: ["学校 (gakkou)", "図書館 (toshokan)", "病院 (byouin)", "銀行 (ginkou)"],
    correctAnswer: 0,
    explanation: "Đoạn audio phát âm từ '学校' (gakkou) có nghĩa là trường học.",
  },
  {
    id: 4,
    type: "pdf",
    skill: "reading",
    question: "Đọc đoạn văn trong file PDF và trả lời câu hỏi: Nhân vật chính đi đâu?",
    content: {
      pdfUrl: "/documents/reading-passage.pdf",
    },
    options: ["Đi học", "Đi làm", "Đi chơi", "Về nhà"],
    correctAnswer: 2,
    explanation: "Theo đoạn văn, nhân vật chính đi chơi với bạn bè.",
  },
  {
    id: 5,
    type: "text",
    skill: "kanji",
    question: "Cách viết Kanji của từ 'người' là gì?",
    options: ["人", "大", "小", "子"],
    correctAnswer: 0,
    explanation: "Kanji '人' (hito/jin) có nghĩa là 'người'.",
  },
]

export default function QuizInterface({
  title = "Bài kiểm tra Tiếng Nhật N5",
  description = "Kiểm tra kiến thức Hiragana, Katakana và từ vựng cơ bản",
  timeLimit = 30,
  questions = sampleQuestions,
  difficulty = "Trung bình",
  onSubmit,
}: Partial<QuizInterfaceProps>) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(timeLimit ? timeLimit * 60 : 0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [showResults, setShowResults] = useState(false)
  const [showAnswerReview, setShowAnswerReview] = useState(false)
  const [quizStartTime, setQuizStartTime] = useState<number>(0)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showResults && quizStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && quizStarted) {
      handleSubmit()
    }
  }, [timeLeft, showResults, quizStarted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setQuizStartTime(Date.now())
    setTimeLeft(timeLimit ? timeLimit * 60 : 0)
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: optionIndex,
    }))
  }

  const handleAudioPlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioReset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const toggleFlag = () => {
    const questionId = questions[currentQuestion].id
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const handleSubmit = () => {
    setShowResults(true)
    onSubmit?.(answers)
    setShowConfirmSubmit(false)
  }

  const handleRestart = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setAnswers({})
    setTimeLeft(timeLimit ? timeLimit * 60 : 0)
    setFlaggedQuestions(new Set())
    setShowResults(false)
    setShowAnswerReview(false)
    setQuizStartTime(0)
  }

  const handleShowAnswers = () => {
    setShowAnswerReview(true)
  }

  const handleBackToResults = () => {
    setShowAnswerReview(false)
  }

  const handleConfirmSubmit = () => {
    setShowConfirmSubmit(true)
  }

  const handleCancelSubmit = () => {
    setShowConfirmSubmit(false)
  }

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      default:
        return null
    }
  }

  // Show preparation screen if quiz hasn't started
  if (!quizStarted) {
    return (
      <QuizPreparation
        title={title}
        description={description}
        timeLimit={timeLimit || 30}
        questionCount={questions.length}
        difficulty={difficulty}
        instructions={[
          "Đọc kỹ từng câu hỏi trước khi chọn đáp án",
          "Mỗi câu hỏi chỉ có một đáp án đúng",
          "Bạn có thể quay lại các câu hỏi đã làm để kiểm tra",
          "Sử dụng nút đánh dấu để ghi nhớ câu hỏi cần xem lại",
          "Bài thi sẽ tự động nộp khi hết thời gian",
        ]}
        onStart={handleStartQuiz}
      />
    )
  }

  // Show answer review if requested
  if (showAnswerReview) {
    return <QuizAnswerReview questions={questions} answers={answers} onBack={handleBackToResults} />
  }

  // Show results if quiz is completed
  if (showResults) {
    const score = Object.entries(answers).reduce((acc, [questionId, answer]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      return acc + (question?.correctAnswer === answer ? 1 : 0)
    }, 0)

    const timeSpent = formatTime((timeLimit || 30) * 60 - timeLeft)

    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        timeSpent={timeSpent}
        answers={answers}
        questions={questions}
        onRestart={handleRestart}
        onShowAnswers={handleShowAnswers}
      />
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const answeredCount = Object.keys(answers).length
  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <p className="text-gray-600 mt-1">{description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-lg font-semibold">
                  <Clock className="h-5 w-5" />
                  <span className={timeLeft < 300 ? "text-red-600" : "text-gray-900"}>{formatTime(timeLeft)}</span>
                </div>
                <p className="text-sm text-gray-600">Thời gian còn lại</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Câu {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                Đã trả lời: {answeredCount}/{questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    {getQuestionIcon(currentQ.type)}
                    <Badge variant="outline">
                      {currentQ.type === "text" && "Văn bản"}
                      {currentQ.type === "image" && "Hình ảnh"}
                      {currentQ.type === "audio" && "Nghe"}
                      {currentQ.type === "pdf" && "Đọc hiểu"}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFlag}
                    className={flaggedQuestions.has(currentQ.id) ? "text-red-600" : "text-gray-400"}
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
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
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleAudioPlay}
                        className="flex items-center space-x-2 bg-transparent"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        <span>{isPlaying ? "Tạm dừng" : "Phát"}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleAudioReset}
                        className="flex items-center space-x-2 bg-transparent"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Phát lại</span>
                      </Button>
                      <Volume2 className="h-5 w-5 text-gray-500" />
                    </div>
                    <audio
                      ref={audioRef}
                      src={currentQ.content.audioUrl}
                      onEnded={() => setIsPlaying(false)}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  </div>
                )}

                {currentQ.type === "pdf" && currentQ.content?.pdfUrl && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <FileText className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-600">Tài liệu đọc hiểu</span>
                    </div>
                    <Document file={currentQ.content.pdfUrl} onLoadError={(error) => console.error("Lỗi tải PDF:", error)}>
                      <Page pageNumber={1} width={300} />
                    </Document>
                  </div>
                )}
                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left border rounded-lg transition-colors ${
                        answers[currentQ.id] === index
                          ? "border-blue-500 bg-blue-50 text-blue-900"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            answers[currentQ.id] === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        >
                          {answers[currentQ.id] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="font-medium text-gray-700">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

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

              <div className="flex space-x-2">
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleConfirmSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Nộp bài
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                    className="flex items-center space-x-2"
                  >
                    <span>Câu tiếp</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Question Navigator */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Danh sách câu hỏi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, index) => (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-colors relative ${
                        currentQuestion === index
                          ? "border-blue-500 bg-blue-500 text-white"
                          : answers[q.id] !== undefined
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {index + 1}
                      {flaggedQuestions.has(q.id) && <Flag className="h-3 w-3 text-red-500 absolute -top-1 -right-1" />}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Đã trả lời:</span>
                  <span className="font-medium">
                    {answeredCount}/{questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Đã đánh dấu:</span>
                  <span className="font-medium">{flaggedQuestions.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Còn lại:</span>
                  <span className="font-medium">{questions.length - answeredCount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Confirm Submit Popup */}
        {showConfirmSubmit && (
          <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận nộp bài</DialogTitle>
              </DialogHeader>
              <p className="text-gray-600 mb-6">
                Bạn đã trả lời {answeredCount}/{questions.length} câu. Bạn có chắc chắn muốn nộp bài? Sau khi nộp, bạn không thể thay đổi đáp án.
              </p>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancelSubmit}>
                  Hủy
                </Button>
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                  Đồng ý
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}