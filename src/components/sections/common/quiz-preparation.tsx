"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  FileText,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  Volume2,
  ImageIcon,
  Headphones,
  BookOpen,
  Play,
} from "lucide-react"

interface QuizPreparationProps {
  title: string
  description: string
  timeLimit: number
  questionCount: number
  difficulty: "Dễ" | "Trung bình" | "Khó"
  instructions: string[]
  onStart: () => void
}

export default function QuizPreparation({
  title = "Bài kiểm tra Tiếng Nhật N5",
  description = "Kiểm tra kiến thức Hiragana, Katakana và từ vựng cơ bản",
  timeLimit = 30,
  questionCount = 5,
  difficulty = "Trung bình",
  instructions = [
    "Đọc kỹ từng câu hỏi trước khi chọn đáp án",
    "Mỗi câu hỏi chỉ có một đáp án đúng",
    "Bạn có thể quay lại các câu hỏi đã làm để kiểm tra",
    "Sử dụng nút đánh dấu để ghi nhớ câu hỏi cần xem lại",
    "Bài thi sẽ tự động nộp khi hết thời gian",
  ],
  onStart,
}: QuizPreparationProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Dễ":
        return "bg-green-100 text-green-800"
      case "Trung bình":
        return "bg-yellow-100 text-yellow-800"
      case "Khó":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const questionTypes = [
    {
      icon: FileText,
      title: "Câu hỏi văn bản",
      description: "Trắc nghiệm 4 đáp án",
      color: "text-blue-600",
    },
    {
      icon: ImageIcon,
      title: "Câu hỏi hình ảnh",
      description: "Nhận diện ký tự, từ vựng",
      color: "text-green-600",
    },
    {
      icon: Headphones,
      title: "Bài nghe",
      description: "Nghe và chọn đáp án đúng",
      color: "text-purple-600",
    },
    {
      icon: BookOpen,
      title: "Đọc hiểu",
      description: "Đọc đoạn văn và trả lời",
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <Target className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Quiz Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{timeLimit}</p>
              <p className="text-sm text-gray-600">Phút</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{questionCount}</p>
              <p className="text-sm text-gray-600">Câu hỏi</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <Badge className={`text-sm ${getDifficultyColor(difficulty)}`}>{difficulty}</Badge>
              <p className="text-sm text-gray-600 mt-1">Độ khó</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">N5</p>
              <p className="text-sm text-gray-600">Trình độ</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Question Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Các loại câu hỏi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questionTypes.map((type, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <type.icon className={`h-6 w-6 ${type.color}`} />
                  <div>
                    <p className="font-medium text-gray-900">{type.title}</p>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Hướng dẫn làm bài</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{instruction}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Technical Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <span>Yêu cầu kỹ thuật</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                <Volume2 className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-900">Âm thanh</p>
                  <p className="text-sm text-gray-600">Cần có loa hoặc tai nghe</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <ImageIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Hình ảnh</p>
                  <p className="text-sm text-gray-600">Màn hình rõ nét</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Kết nối</p>
                  <p className="text-sm text-gray-600">Internet ổn định</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Lưu ý quan trọng</h3>
                <ul className="space-y-1 text-sm text-amber-800">
                  <li>• Không được thoát khỏi trang web trong quá trình làm bài</li>
                  <li>• Bài thi sẽ tự động nộp khi hết thời gian</li>
                  <li>• Không thể làm lại sau khi đã nộp bài</li>
                  <li>• Đảm bảo thiết bị có đủ pin và kết nối internet ổn định</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">Bạn đã sẵn sàng để bắt đầu bài kiểm tra?</p>
          <Button
            onClick={onStart}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Play className="h-5 w-5 mr-2" />
            Bắt đầu làm bài
          </Button>
          <p className="text-sm text-gray-500">Nhấn nút để bắt đầu bài kiểm tra</p>
        </div>
      </div>
    </div>
  )
}