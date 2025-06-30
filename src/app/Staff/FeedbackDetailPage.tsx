"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, User, CheckCircle, FileText, MessageSquare, Plus, Eye, Clock, XCircle } from "lucide-react"

interface Feedback {
  id: number
  requestId: string
  courseTitle: string
  courseSubtitle: string
  lessonTitle: string
  lessonCode: string
  manager: string
  managerAvatar?: string
  approvalDate: string
  decision: "Chờ duyệt" | "Đã duyệt" | "Từ chối"
  feedback?: string
  createdAt: string
}

interface FeedbackDetailPageProps {
  feedback: Feedback
  onBack: () => void
}

export default function FeedbackDetailPage({ feedback, onBack }: FeedbackDetailPageProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Đã duyệt":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Đã duyệt</Badge>
      case "Từ chối":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Từ chối</Badge>
      case "Chờ duyệt":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Chờ duyệt</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const timelineData = [
    {
      title: "Gửi yêu cầu",
      date: "15/3/2024",
      description: "Yêu cầu được gửi đến manager",
      status: "completed",
      icon: FileText,
    },
    {
      title: "Đã duyệt",
      date: feedback.approvalDate,
      description: "Manager đã xem xét và phản hồi",
      status: feedback.decision === "Đã duyệt" ? "completed" : feedback.decision === "Từ chối" ? "rejected" : "pending",
      icon: feedback.decision === "Đã duyệt" ? CheckCircle : MessageSquare,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại danh sách</span>
            </Button>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">Chi tiết feedback</h1>
            <p className="text-gray-600 mt-1">Xem chi tiết phản hồi từ manager</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {feedback.requestId}
                  </span>
                  {getStatusBadge(feedback.decision)}
                  
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">{feedback.lessonTitle}</h2>
                <p className="text-gray-600 mb-6">{feedback.lessonCode}</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Mô tả bài học
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Bài học này sẽ giúp học viên luyện tập và củng cố kiến thức về Hiragana thông qua các bài tập nâng
                      cao, bao gồm đọc từ phức tạp và viết câu hoàn chỉnh bằng Hiragana.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Lý do yêu cầu ban đầu</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Học viên cần thêm bài tập để củng cố kiến thức Hiragana trước khi chuyển sang Katakana. Hiện tại
                      chỉ có 8 bài học trong chương này là chưa đủ để học viên thành thạo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manager Feedback */}
            {feedback.feedback && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Feedback từ Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-gray-700 italic leading-relaxed">
                      "
                      {feedback.feedback ||
                        "Yêu cầu hợp lý và cần thiết. Bài học này sẽ giúp học viên củng cố kiến thức Hiragana trước khi chuyển sang Katakana. Đã phê duyệt để triển khai. Tuy nhiên, đề xuất bổ sung thêm một số bài tập tương tác để tăng tính hấp dẫn cho học viên."}
                      "
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timelineData.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          item.status === "completed"
                            ? "bg-green-100"
                            : item.status === "rejected"
                              ? "bg-red-100"
                              : "bg-yellow-100"
                        }`}
                      >
                        <item.icon
                          className={`h-4 w-4 ${
                            item.status === "completed"
                              ? "text-green-600"
                              : item.status === "rejected"
                                ? "text-red-600"
                                : "text-yellow-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">
                          {item.date} - {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Thông tin khóa học
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">ID Khóa học</p>
                  <p className="font-medium text-gray-900">JP001</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tên khóa học</p>
                  <p className="font-medium text-gray-900">{feedback.courseTitle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ID Chương</p>
                  <p className="font-medium text-gray-900">chapter-1</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tên chương</p>
                  <p className="font-medium text-gray-900">{feedback.courseSubtitle}</p>
                </div>
              </CardContent>
            </Card>

            {/* Manager Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Manager phụ trách
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{feedback.manager}</p>
                    <p className="text-sm text-gray-600">manager@company.com</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Ngày duyệt:</p>
                    <p className="font-medium text-gray-900">{feedback.approvalDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Thời gian xử lý:</p>
                    <p className="font-medium text-gray-900">1 ngày</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
  <CardHeader>
    <CardTitle>Hành động</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {feedback.decision === "Đã duyệt" && (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Yêu cầu đã được duyệt</span>
        </div>
        <p className="text-sm text-green-700">Bạn có thể bắt đầu tạo bài học ngay bây giờ.</p>
      </div>
    )}
    {feedback.decision === "Chờ duyệt" && (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">Yêu cầu đang chờ duyệt</span>
        </div>
        <p className="text-sm text-yellow-700">Vui lòng đợi phản hồi từ manager.</p>
      </div>
    )}
    {feedback.decision === "Từ chối" && (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <XCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm font-medium text-red-800">Yêu cầu đã bị từ chối</span>
        </div>
        <p className="text-sm text-red-700">Vui lòng kiểm tra phản hồi từ manager để điều chỉnh.</p>
      </div>
    )}

    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
      <Plus className="h-4 w-4 mr-2" />
      Tạo bài học
    </Button>
    <Button variant="outline" className="w-full bg-transparent">
      <Eye className="h-4 w-4 mr-2" />
      Xem lại bài học cũ
    </Button>
  </CardContent>
</Card>
          </div>
        </div>
      </div>
    </div>
  )
}
