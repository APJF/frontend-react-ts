"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Filter,
} from "lucide-react";
import FeedbackDetailPage from "@/app/Staff/FeedbackDetailPage";

interface Feedback {
  id: number;
  requestId: string;
  courseTitle: string;
  courseSubtitle: string;
  lessonTitle: string;
  lessonCode: string;
  manager: string;
  managerAvatar?: string;
  approvalDate: string;
  decision: "Chờ duyệt" | "Đã duyệt" | "Từ chối";
  feedback?: string;
  createdAt: string;
}

const sampleFeedbacks: Feedback[] = [
  {
    id: 1,
    requestId: "REQ005",
    courseTitle: "Kanji cơ bản - 300 chữ",
    courseSubtitle: "Kanji về số đếm",
    lessonTitle: "Số đếm từ 100-1000",
    lessonCode: "lesson-1-6",
    manager: "Nguyễn Văn Manager",
    approvalDate: "Chưa duyệt",
    decision: "Chờ duyệt",
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: 2,
    requestId: "REQ001",
    courseTitle: "Tiếng Nhật N5 - Cơ bản",
    courseSubtitle: "Hiragana - Bảng chữ cái cơ bản",
    lessonTitle: "Luyện tập Hiragana nâng cao",
    lessonCode: "lesson-1-9",
    manager: "Trần Văn Manager",
    approvalDate: "16/3/2024",
    decision: "Đã duyệt",
    feedback: "Nội dung bài học rất tốt, phù hợp với trình độ N5",
    createdAt: "2024-03-16T09:00:00Z",
  },
  {
    id: 3,
    requestId: "REQ002",
    courseTitle: "Tiếng Nhật N5 - Cơ bản",
    courseSubtitle: "Katakana - Bảng chữ cái ngoại lai",
    lessonTitle: "Katakana trong từ ngoại lai",
    lessonCode: "lesson-2-7",
    manager: "Trần Văn Manager",
    approvalDate: "14/3/2024",
    decision: "Đã duyệt",
    feedback: "Bài học có cấu trúc tốt, ví dụ phong phú",
    createdAt: "2024-03-14T14:30:00Z",
  },
  {
    id: 4,
    requestId: "REQ003",
    courseTitle: "Tiếng Nhật N4 - Sơ cấp",
    courseSubtitle: "Ngữ pháp N4 cơ bản",
    lessonTitle: "Mẫu câu điều kiện",
    lessonCode: "lesson-3-5",
    manager: "Lê Thị Manager",
    approvalDate: "13/3/2024",
    decision: "Từ chối",
    feedback: "Nội dung chưa đủ chi tiết, cần bổ sung thêm ví dụ thực tế",
    createdAt: "2024-03-13T11:15:00Z",
  },
  {
    id: 5,
    requestId: "REQ004",
    courseTitle: "Tiếng Nhật N5 - Cơ bản",
    courseSubtitle: "Kanji cơ bản N5",
    lessonTitle: "Kanji về thời tiết",
    lessonCode: "lesson-3-11",
    manager: "Trần Văn Manager",
    approvalDate: "12/3/2024",
    decision: "Đã duyệt",
    feedback: "Bài học hay, hình ảnh minh họa rõ ràng",
    createdAt: "2024-03-12T16:45:00Z",
  },
  {
    id: 6,
    requestId: "REQ006",
    courseTitle: "Tiếng Nhật N4 - Sơ cấp",
    courseSubtitle: "Từ vựng N4",
    lessonTitle: "Từ vựng về công việc",
    lessonCode: "lesson-2-8",
    manager: "Lê Thị Manager",
    approvalDate: "10/3/2024",
    decision: "Đã duyệt",
    feedback: "Từ vựng phong phú, phù hợp với chương trình N4",
    createdAt: "2024-03-10T13:20:00Z",
  },
  {
    id: 7,
    requestId: "REQ007",
    courseTitle: "Tiếng Nhật N3 - Trung cấp",
    courseSubtitle: "Ngữ pháp N3 nâng cao",
    lessonTitle: "Cách sử dụng keigo",
    lessonCode: "lesson-4-2",
    manager: "Phạm Văn Manager",
    approvalDate: "08/3/2024",
    decision: "Từ chối",
    feedback: "Nội dung quá khó so với trình độ, cần điều chỉnh",
    createdAt: "2024-03-08T10:30:00Z",
  },
  {
    id: 8,
    requestId: "REQ008",
    courseTitle: "Tiếng Nhật N2 - Trung cao cấp",
    courseSubtitle: "Đọc hiểu N2",
    lessonTitle: "Đọc hiểu văn bản dài",
    lessonCode: "lesson-5-3",
    manager: "Hoàng Thị Manager",
    approvalDate: "05/3/2024",
    decision: "Từ chối",
    feedback: "Văn bản quá dài, cần chia nhỏ thành nhiều phần",
    createdAt: "2024-03-05T15:10:00Z",
  },
];

export default function StaffFeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [managerFilter, setManagerFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const itemsPerPage = 6;

  // Calculate statistics
  const stats = useMemo(() => {
    const total = sampleFeedbacks.length;
    const pending = sampleFeedbacks.filter((f) => f.decision === "Chờ duyệt").length;
    const approved = sampleFeedbacks.filter((f) => f.decision === "Đã duyệt").length;
    const rejected = sampleFeedbacks.filter((f) => f.decision === "Từ chối").length;

    return { total, pending, approved, rejected };
  }, []);

  // Get unique managers for filter
  const uniqueManagers = useMemo(() => {
    return Array.from(new Set(sampleFeedbacks.map((f) => f.manager)));
  }, []);

  // Filter feedbacks
  const filteredFeedbacks = useMemo(() => {
    return sampleFeedbacks.filter((feedback) => {
      const matchesSearch =
        feedback.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || feedback.decision === statusFilter;
      const matchesManager = managerFilter === "all" || feedback.manager === managerFilter;

      return matchesSearch && matchesStatus && matchesManager;
    });
  }, [searchTerm, statusFilter, managerFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + itemsPerPage);

  const getDecisionBadge = (decision: string) => {
    switch (decision) {
      case "Chờ duyệt":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Chờ duyệt
          </Badge>
        );
      case "Đã duyệt":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
            Đã duyệt
          </Badge>
        );
      case "Từ chối":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
            Từ chối
          </Badge>
        );
      default:
        return <Badge variant="secondary">{decision}</Badge>;
    }
  };

  const handleViewDetails = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setShowDetailPage(true);
  };

  const handleBack = () => {
    setSelectedFeedback(null);
    setShowDetailPage(false);
  };

  // Render chi tiết hoặc danh sách dựa trên trạng thái
  if (showDetailPage && selectedFeedback) {
    return <FeedbackDetailPage feedback={selectedFeedback} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Feedback từ Manager</h1>
          <p className="text-gray-600">Xem phản hồi và quyết định của manager về các yêu cầu bài học</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng yêu cầu</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Đã duyệt</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Từ chối</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Bộ lọc và tìm kiếm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Chờ duyệt">Chờ duyệt</SelectItem>
                  <SelectItem value="Đã duyệt">Đã duyệt</SelectItem>
                  <SelectItem value="Từ chối">Từ chối</SelectItem>
                </SelectContent>
              </Select>
              <Select value={managerFilter} onValueChange={setManagerFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả manager" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Tất cả manager</SelectItem>
                  {uniqueManagers.map((manager) => (
                    <SelectItem key={manager} value={manager}>
                      {manager}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-600 flex items-center">
                Tìm thấy {filteredFeedbacks.length} feedback
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">STT</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      ID Yêu cầu
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Khóa học / Chương
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Bài học</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Manager</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Thời gian duyệt
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Quyết định</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedFeedbacks.map((feedback, index) => (
                    <tr key={feedback.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{startIndex + index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {feedback.requestId}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {feedback.courseTitle}
                          </div>
                          <div className="text-sm text-gray-500">{feedback.courseSubtitle}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {feedback.lessonTitle}
                          </div>
                          <div className="text-sm text-gray-500">{feedback.lessonCode}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {feedback.manager.charAt(0)}
                            </span>
                          </div>
                          <div className="text-sm font-medium text-gray-900">{feedback.manager}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{feedback.approvalDate}</td>
                      <td className="px-6 py-4">{getDecisionBadge(feedback.decision)}</td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(feedback)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Hiển thị {startIndex + 1} -{" "}
            {Math.min(startIndex + itemsPerPage, filteredFeedbacks.length)} trong tổng số{" "}
            {filteredFeedbacks.length} feedback
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trước
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-gray-900 text-white" : ""}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}