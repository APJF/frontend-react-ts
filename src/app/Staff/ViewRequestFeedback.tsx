"use client";

import { useState, useMemo, useEffect } from "react";
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

export default function StaffFeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [managerFilter, setManagerFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const staffId = "2"; // TODO: Replace with dynamic staffId if needed
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/approval-requests/by-staff/${staffId}`
        );
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          // Map API data to Feedback type
          const mapped = json.data.map((item: any) => ({
            id: item.id,
            requestId: item.requestCode || item.requestId || "",
            courseTitle: item.courseTitle || item.course?.title || "",
            courseSubtitle: item.courseSubtitle || item.course?.subtitle || "",
            lessonTitle: item.lessonTitle || item.lesson?.title || "",
            lessonCode: item.lessonCode || item.lesson?.code || "",
            manager: item.managerName || item.manager?.name || "",
            managerAvatar: item.managerAvatar || item.manager?.avatar || undefined,
            approvalDate: item.approvalDate || "Chưa duyệt",
            decision:
              item.status === "PENDING"
                ? "Chờ duyệt"
                : item.status === "APPROVED"
                ? "Đã duyệt"
                : item.status === "REJECTED"
                ? "Từ chối"
                : "Chờ duyệt",
            feedback: item.feedback || "",
            createdAt: item.createdAt || "",
          }));
          setFeedbacks(mapped);
        } else {
          setFeedbacks([]);
        }
      } catch (err) {
        setFeedbacks([]);
      }
    }
    fetchFeedbacks();
  }, [staffId]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = feedbacks.length;
    const pending = feedbacks.filter((f) => f.decision === "Chờ duyệt").length;
    const approved = feedbacks.filter((f) => f.decision === "Đã duyệt").length;
    const rejected = feedbacks.filter((f) => f.decision === "Từ chối").length;

    return { total, pending, approved, rejected };
  }, [feedbacks]);

  // Get unique managers for filter
  const uniqueManagers = useMemo(() => {
    return Array.from(new Set(feedbacks.map((f) => f.manager)));
  }, [feedbacks]);

  // Filter feedbacks
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) => {
      const matchesSearch =
        feedback.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || feedback.decision === statusFilter;
      const matchesManager = managerFilter === "all" || feedback.manager === managerFilter;

      return matchesSearch && matchesStatus && matchesManager;
    });
  }, [searchTerm, statusFilter, managerFilter, feedbacks]);

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