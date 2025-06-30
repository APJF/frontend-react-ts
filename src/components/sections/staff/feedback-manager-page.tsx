"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MessageSquare, Clock, CheckCircle, XCircle, Eye, Filter, TrendingUp, Calendar } from "lucide-react"

interface FeedbackRecord {
  id: string
  requestId: string
  course: string
  chapter: string
  lesson: string
  manager: string
  approvalTime: string
  decision: "Chờ duyệt" | "Đã duyệt" | "Từ chối"
  details?: string
}

const sampleFeedbackData: FeedbackRecord[] = [
  {
    id: "1",
    requestId: "REQ005",
    course: "Kanji cơ bản - 200 chữ",
    chapter: "Kanji cơ bản",
    lesson: "Số đếm từ 100-1000",
    manager: "Nguyễn Văn Manager",
    approvalTime: "",
    decision: "Chờ duyệt",
  },
  {
    id: "2",
    requestId: "REQ001",
    course: "Tiếng Nhật N5 - Cơ bản",
    chapter: "Katakana - Bảng chữ cái nguyên âm",
    lesson: "Luyện tập Hiragana nâng cao",
    manager: "Trần Văn Manager",
    approvalTime: "16/3/2024",
    decision: "Đã duyệt",
  },
  {
    id: "3",
    requestId: "REQ002",
    course: "Tiếng Nhật N5 - Cơ bản",
    chapter: "Katakana - Bảng chữ cái nguyên âm",
    lesson: "Katakana trong từ ngữ lại",
    manager: "Trần Văn Manager",
    approvalTime: "14/3/2024",
    decision: "Đã duyệt",
  },
  {
    id: "4",
    requestId: "REQ003",
    course: "Tiếng Nhật N4 - Sơ cấp",
    chapter: "Ngữ pháp lưu cấp",
    lesson: "Mẫu câu điều kiện",
    manager: "Lê Thị Manager",
    approvalTime: "13/3/2024",
    decision: "Từ chối",
  },
  {
    id: "5",
    requestId: "REQ004",
    course: "Tiếng Nhật N5 - Cơ bản",
    chapter: "Kanji cơ bản N5",
    lesson: "Kanji về thời tiết",
    manager: "Trần Văn Manager",
    approvalTime: "12/3/2024",
    decision: "Đã duyệt",
  },
  {
    id: "6",
    requestId: "REQ006",
    course: "Tiếng Nhật N4 - Sơ cấp",
    chapter: "Từ vựng N4",
    lesson: "Từ vựng về công việc",
    manager: "Lê Thị Manager",
    approvalTime: "10/3/2024",
    decision: "Đã duyệt",
  },
]

export function FeedbackManagerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [managerFilter, setManagerFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Calculate statistics
  const stats = useMemo(() => {
    const total = sampleFeedbackData.length
    const pending = sampleFeedbackData.filter((item) => item.decision === "Chờ duyệt").length
    const approved = sampleFeedbackData.filter((item) => item.decision === "Đã duyệt").length
    const rejected = sampleFeedbackData.filter((item) => item.decision === "Từ chối").length

    return { total, pending, approved, rejected }
  }, [])

  // Get unique managers for filter
  const uniqueManagers = Array.from(new Set(sampleFeedbackData.map((item) => item.manager)))

  // Filter data
  const filteredData = useMemo(() => {
    return sampleFeedbackData.filter((item) => {
      const matchesSearch =
        item.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lesson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.manager.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || item.decision === statusFilter
      const matchesManager = managerFilter === "all" || item.manager === managerFilter

      return matchesSearch && matchesStatus && matchesManager
    })
  }, [searchTerm, statusFilter, managerFilter])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "Đã duyệt":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "Từ chối":
        return "bg-red-100 text-red-800 border-red-200"
      case "Chờ duyệt":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case "Đã duyệt":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />
      case "Từ chối":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Chờ duyệt":
        return <Clock className="h-4 w-4 text-amber-600" />
      default:
        return null
    }
  }

  const getManagerInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Feedback từ Manager</h1>
              <p className="text-blue-600 font-medium mt-1">
                Xem phản hồi và quyết định của manager về các yêu cầu bài học
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-blue-600 font-medium text-sm">Tổng yêu cầu</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-amber-600 font-medium text-sm">Chờ duyệt</p>
                  <p className="text-3xl font-bold text-amber-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-emerald-600 font-medium text-sm">Đã duyệt</p>
                  <p className="text-3xl font-bold text-emerald-900">{stats.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-lg">
                  <XCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-red-600 font-medium text-sm">Từ chối</p>
                  <p className="text-3xl font-bold text-red-900">{stats.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-blue-900">Bộ lọc và tìm kiếm</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Tìm kiếm feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Chờ duyệt">Chờ duyệt</SelectItem>
                  <SelectItem value="Đã duyệt">Đã duyệt</SelectItem>
                  <SelectItem value="Từ chối">Từ chối</SelectItem>
                </SelectContent>
              </Select>

              <Select value={managerFilter} onValueChange={setManagerFilter}>
                <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Tất cả manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả manager</SelectItem>
                  {uniqueManagers.map((manager) => (
                    <SelectItem key={manager} value={manager}>
                      {manager}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="text-right">
                <span className="text-sm text-blue-600 bg-blue-100 px-3 py-2 rounded-full font-medium">
                  Tìm thấy {filteredData.length} feedback
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Table */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium">
                <div className="col-span-1">STT</div>
                <div className="col-span-1">ID Yêu cầu</div>
                <div className="col-span-3">Khóa học / Chương</div>
                <div className="col-span-2">Bài học</div>
                <div className="col-span-2">Manager</div>
                <div className="col-span-1">Thời gian duyệt</div>
                <div className="col-span-1">Quyết định</div>
                <div className="col-span-1">Chi tiết</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-blue-100">
              {currentData.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="text-blue-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2 text-blue-700">Không tìm thấy feedback</p>
                    <p className="text-sm text-blue-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  </div>
                </div>
              ) : (
                currentData.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-blue-50/50 transition-colors"
                  >
                    <div className="col-span-1 text-sm text-blue-900 font-medium">{startIndex + index + 1}</div>
                    <div className="col-span-1">
                      <Badge variant="outline" className="border-blue-300 text-blue-700 font-mono text-xs">
                        {item.requestId}
                      </Badge>
                    </div>
                    <div className="col-span-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-blue-900 line-clamp-1">{item.course}</div>
                        <div className="text-xs text-blue-600 line-clamp-1">{item.chapter}</div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-blue-700 line-clamp-2 leading-relaxed">{item.lesson}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-blue-200">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold">
                            {getManagerInitials(item.manager)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-blue-900 line-clamp-1">{item.manager}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      {item.approvalTime ? (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <Calendar className="h-3 w-3" />
                          {item.approvalTime}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center gap-2">
                        {getDecisionIcon(item.decision)}
                        <Badge className={`${getDecisionColor(item.decision)} text-xs font-medium`}>
                          {item.decision}
                        </Badge>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {filteredData.length > 0 && (
              <div className="bg-blue-50/50 border-t border-blue-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-700 font-medium">
                    Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredData.length)} trong tổng số{" "}
                    {filteredData.length} feedback
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="text-blue-600 border-blue-300 hover:bg-blue-100"
                    >
                      Trước
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={
                            currentPage === page
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "text-blue-600 border-blue-300 hover:bg-blue-100"
                          }
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="text-blue-600 border-blue-300 hover:bg-blue-100"
                    >
                      Sau
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
