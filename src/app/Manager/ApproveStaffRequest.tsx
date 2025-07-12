"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, BookOpen, Clock, Check, X, Plus, Search } from "lucide-react"
import toast from "react-hot-toast"
import ReactPaginate from "react-paginate"


interface Request {
  id: number;
  type: "Subject" | "Chapter" | "Unit";
  title: string;
  creator: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  updatedAt: string;
  // Subject specific fields
  level?: "N5" | "N4" | "N3" | "N2" | "N1";
  topic?: string;
  description?: string;
  estimatedDuration?: number;
  image?: string;
  orderNumber?: number;
  // Chapter specific fields
  subjectId?: string;
  subjectName?: string;
  // Unit specific fields
  chapterId?: string;
  chapterName?: string;
  contents?: {
    skill: "Kanji" | "Từ vựng" | "Ngữ pháp" | "Đọc hiểu" | "Nghe";
    description: string;
    pdfUrl?: string;
  }[];
  // Optional skill field
  skill?: "Kanji" | "Từ vựng" | "Ngữ pháp" | "Đọc hiểu" | "Nghe";
}

interface PaginationData {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export default function ManagerApprovalInterface() {
  // Thay thế sample data bằng fetch API
  const [allRequests, setAllRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // Map API data sang Request type của FE
  const mapApiToRequest = (item: any): Request => {
    let type: Request["type"] = "Subject";
    if (item.targetType === "COURSE") type = "Subject";
    else if (item.targetType === "CHAPTER") type = "Chapter";
    else if (item.targetType === "UNIT") type = "Unit";
    // Lấy thêm level, topic nếu có từ item.target (nếu backend trả về)
    return {
      id: item.id,
      type,
      title: item.targetTitle,
      creator: item.createdBy,
      status: item.decision === "PENDING" ? "Pending" : item.decision === "APPROVED" ? "Approved" : "Rejected",
      createdAt: item.createdAt,
      updatedAt: item.reviewedAt || item.createdAt,
      level: item.target?.level || undefined,
      topic: item.target?.topic || undefined,
      // ... các trường khác nếu backend trả về
    };
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/approval-requests")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setAllRequests(data.data.map(mapApiToRequest));
        } else {
          setAllRequests([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setAllRequests([]);
        setLoading(false);
      });
  }, []);

  // States
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectingRequest, setRejectingRequest] = useState<Request | null>(null)
  const [rejectFeedback, setRejectFeedback] = useState("")
  const [currentTab, setCurrentTab] = useState("all")

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [levelFilter, setLevelFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [chapterFilter, setChapterFilter] = useState("all")

  // Pagination states
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10,
  })

  // Thêm state lưu lý do từ chối trong dialog chi tiết
  const [detailRejectFeedback, setDetailRejectFeedback] = useState("");

  // Filter and search logic
  const filteredRequests = useMemo(() => {
    let filtered = [...allRequests]; // Create a copy to avoid mutating original

    // Filter by tab
    if (currentTab !== "all") {
      const typeMap = { subjects: "Subject", chapters: "Chapter", units: "Unit" };
      filtered = filtered.filter((req) => req.type === typeMap[currentTab as keyof typeof typeMap]);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.id.toString().includes(searchTerm.toLowerCase()) ||
          req.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter)
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1); // Bắt đầu tháng hiện tại

      filtered = filtered.filter((req) => {
        const createdDate = new Date(req.createdAt);
        switch (dateFilter) {
          case "today":
            return createdDate >= today;
          case "week":
            return createdDate >= weekAgo;
          case "month":
            return createdDate >= monthStart && createdDate <= today; // Giới hạn trong tháng hiện tại
          default:
            return true;
        }
      });
    }

    // Level filter (for subjects)
    if (levelFilter !== "all" && currentTab === "subjects") {
      filtered = filtered.filter((req) => req.level === levelFilter)
    }

    // Subject filter (for chapters and units)
    if (subjectFilter !== "all" && (currentTab === "chapters" || currentTab === "units")) {
      filtered = filtered.filter((req) => req.subjectName === subjectFilter)
    }

    // Chapter filter (for units)
    if (chapterFilter !== "all" && currentTab === "units") {
      filtered = filtered.filter((req) => req.chapterName === chapterFilter)
    }

    // Always apply sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [
    allRequests,
    currentTab,
    searchTerm,
    statusFilter,
    dateFilter,
    sortOrder, // Ensure sortOrder triggers re-computation
    levelFilter,
    subjectFilter,
    chapterFilter,
  ]);

  // Pagination logic
  const paginatedRequests = useMemo(() => {
    const startIndex = pagination.currentPage * pagination.itemsPerPage
    const endIndex = startIndex + pagination.itemsPerPage
    return filteredRequests.slice(startIndex, endIndex)
  }, [filteredRequests, pagination.currentPage, pagination.itemsPerPage])

  // Update pagination when filtered requests change
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalItems: filteredRequests.length,
      totalPages: Math.ceil(filteredRequests.length / prev.itemsPerPage),
      currentPage: 0, // Reset to first page when filters change
    }))
  }, [filteredRequests])

  useEffect(() => {
    // Force initial sort on mount
    const initialSort = [...allRequests].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    setPagination((prev) => ({
      ...prev,
      totalItems: initialSort.length,
      totalPages: Math.ceil(initialSort.length / prev.itemsPerPage),
      currentPage: 0,
    }));
  }, [sortOrder, allRequests]); // Chạy lại khi sortOrder hoặc allRequests thay đổi

  // Get unique values for filters
  const uniqueSubjects = useMemo(() => {
    return Array.from(
      new Set(allRequests.map((req) => req.subjectName).filter((name): name is string => name !== undefined))
    );
  }, [allRequests]);

  const uniqueChapters = useMemo(() => {
    return Array.from(
      new Set(allRequests.map((req) => req.chapterName).filter((name): name is string => name !== undefined))
    );
  }, [allRequests]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: selectedItem.selected,
    }))
  }

  const approveRequest = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/approval-requests/${id}/approve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewedBy: "admin" }) // Nếu backend yêu cầu
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Yêu cầu đã được phê duyệt!");
        setAllRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "Approved", updatedAt: new Date().toISOString() } : r));
      } else {
        toast.error(data.message || "Phê duyệt thất bại!");
      }
    } catch (err: any) {
      if (err instanceof Response) {
        err.json().then((data: any) => toast.error(data.message || "Lỗi kết nối server!"));
      } else {
        toast.error("Lỗi kết nối server!");
      }
    }
  }

  const handleRejectClick = (request: Request, fromDetailDialog = false) => {
    if (fromDetailDialog) {
      // Không mở popup mini, chỉ xử lý trong dialog chi tiết
      handleRejectSubmitFromDetail(request);
    } else {
      setRejectingRequest(request)
      setIsRejectDialogOpen(true)
    }
  }

  // Hàm xử lý từ chối từ dialog chi tiết
  const handleRejectSubmitFromDetail = async (request: Request) => {
    if (detailRejectFeedback.trim()) {
      try {
        const res = await fetch(`http://localhost:8080/api/approval-requests/${request.id}/reject`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedback: detailRejectFeedback, reviewedBy: "admin" })
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Yêu cầu đã bị từ chối!");
          setAllRequests((prev) => prev.map((r) => r.id === request.id ? { ...r, status: "Rejected", updatedAt: new Date().toISOString() } : r));
          setIsDialogOpen(false);
          setDetailRejectFeedback("");
        } else {
          toast.error(data.message || "Từ chối thất bại!");
        }
      } catch (err: any) {
        toast.error("Lỗi kết nối server!");
      }
    } else {
      toast.error("Vui lòng nhập lý do từ chối!");
    }
  }

  const handleRejectSubmit = async () => {
    if (rejectingRequest && rejectFeedback.trim()) {
      try {
        const res = await fetch(`http://localhost:8080/api/approval-requests/${rejectingRequest.id}/reject`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedback: rejectFeedback, reviewedBy: "admin" }) // Nếu backend yêu cầu
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Yêu cầu đã bị từ chối!");
          setAllRequests((prev) => prev.map((r) => r.id === rejectingRequest.id ? { ...r, status: "Rejected", updatedAt: new Date().toISOString() } : r));
        } else {
          toast.error(data.message || "Từ chối thất bại!");
        }
      } catch (err: any) {
        if (err instanceof Response) {
          err.json().then((data: any) => toast.error(data.message || "Lỗi kết nối server!"));
        } else {
          toast.error("Lỗi kết nối server!");
        }
      }
      setIsRejectDialogOpen(false)
      setRejectingRequest(null)
      setRejectFeedback("")
    }
  }

  const handleRowClick = (request: Request) => {
    setSelectedRequest(request)
    setIsDialogOpen(true)
  }

  const [filteredChapters, setFilteredChapters] = useState<string[]>([]);

  useEffect(() => {
    if (subjectFilter !== "all") {
      const chapters = Array.from(
        new Set(
          allRequests
            .filter((req) => req.type === "Unit" && req.subjectName === subjectFilter)
            .map((req) => req.chapterName)
            .filter((name): name is string => name !== undefined)
        )
      );
      setFilteredChapters(chapters);
    } else {
      setFilteredChapters([]);
    }
  }, [subjectFilter, allRequests]);

  const renderFilters = () => (
    <div className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow-sm">
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm theo ID hoặc tiêu đề..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent className=" bg-white">
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Thời gian" />
          </SelectTrigger>
          <SelectContent className=" bg-white">
            <SelectItem value="all">Tất cả thời gian</SelectItem>
            <SelectItem value="today">Hôm nay</SelectItem>
            <SelectItem value="week">Tuần này</SelectItem>
            <SelectItem value="month">Tháng này</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent className=" bg-white">
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="oldest">Cũ nhất</SelectItem>
          </SelectContent>
        </Select>

        {currentTab === "subjects" && (
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="all">Tất cả level</SelectItem>
              <SelectItem value="N5">N5</SelectItem>
              <SelectItem value="N4">N4</SelectItem>
              <SelectItem value="N3">N3</SelectItem>
              <SelectItem value="N2">N2</SelectItem>
              <SelectItem value="N1">N1</SelectItem>
            </SelectContent>
          </Select>
        )}

        {(currentTab === "chapters" || currentTab === "units") && (
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Môn học" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="all">Tất cả môn học</SelectItem>
              {uniqueSubjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {currentTab === "units" && subjectFilter !== "all" && filteredChapters.length > 0 && (
          <Select value={chapterFilter} onValueChange={setChapterFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Chương" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectItem value="all">Tất cả chương</SelectItem>
              {filteredChapters.map((chapter) => (
                <SelectItem key={chapter} value={chapter}>
                  {chapter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );

  const renderTable = (requests: Request[], columns: string[]) => (
    <div className="">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((req) => (
            <tr
              key={req.id}
              className="hover:bg-blue-50 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
              onClick={() => handleRowClick(req)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{req.id}</td>
              {currentTab === "subjects" && (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{req.level}</td>
                  <td className="px-6 py-4 text-gray-900">{req.topic}</td>
                </>
              )}
              {currentTab === "chapters" && <td className="px-6 py-4 text-gray-900">{req.subjectName}</td>}
              {currentTab === "units" && (
                <>
                  <td className="px-6 py-4 text-gray-900">{req.subjectName}</td>
                  <td className="px-6 py-4 text-gray-900">{req.chapterName}</td>
                </>
              )}
              <td className="px-6 py-4 text-gray-900">{req.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">{req.creator}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${req.status === "Pending"
                      ? "bg-yellow-500"
                      : req.status === "Approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                >
                  {req.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                {new Date(req.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => approveRequest(req.id)}
                  disabled={req.status !== "Pending"}
                  className="mr-2 text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRejectClick(req)}
                  disabled={req.status !== "Pending"}
                  className="text-white bg-red-600 hover:bg-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderDetailDialog = () => {
    if (!selectedRequest) return null

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[70vw] max-w-none bg-white rounded-xl shadow-xl p-0 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">
              Chi tiết yêu cầu {selectedRequest.type.toLowerCase()}
            </h1>
            <p className="text-gray-600 mt-1">
              Xem xét và duyệt yêu cầu{" "}
              {selectedRequest.type === "Subject"
                ? "khóa học"
                : selectedRequest.type === "Chapter"
                  ? "chương"
                  : "bài học"}{" "}
              mới
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Request Info */}
                <div className="bg-white">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {String(selectedRequest.id).padStart(3, "0")}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${selectedRequest.status === "Pending"
                          ? "bg-yellow-500"
                          : selectedRequest.status === "Approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                    >
                      {selectedRequest.status === "Pending"
                        ? "Chờ duyệt"
                        : selectedRequest.status === "Approved"
                          ? "Đã duyệt"
                          : selectedRequest.status === "Rejected"
                            ? "Từ chối"
                            : selectedRequest.status}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedRequest.title}</h2>

                  {selectedRequest.type === "Unit" && selectedRequest.skill && (
                    <p className="text-gray-600 mb-6">{selectedRequest.skill}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Mô tả{" "}
                    {selectedRequest.type === "Subject"
                      ? "khóa học"
                      : selectedRequest.type === "Chapter"
                        ? "chương"
                        : "bài học"}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedRequest.description || "Không có mô tả"}</p>
                </div>

                {/* Additional Info Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {selectedRequest.estimatedDuration && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">Thời gian dự kiến</h4>
                      <div className="flex items-center gap-2 text-gray-900">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {selectedRequest.estimatedDuration} phút
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Ngày gửi yêu cầu</h4>
                    <div className="flex items-center gap-2 text-gray-900">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 012 2z"
                        />
                      </svg>
                      {new Date(selectedRequest.createdAt).toLocaleDateString("vi-VN")}
                    </div>
                  </div>

                  {selectedRequest.type === "Unit" && selectedRequest.contents && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">Số tài liệu</h4>
                      <div className="flex items-center gap-2 text-gray-900">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {selectedRequest.contents.length} tài liệu
                      </div>
                    </div>
                  )}
                </div>

                {/* File Attachments */}
                {selectedRequest.type === "Unit" && selectedRequest.contents && selectedRequest.contents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tài liệu đính kèm</h3>
                    <div className="space-y-3">
                      {selectedRequest.contents.map((content, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{content.skill} - {selectedRequest.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{content.description}</p>
                              {content.pdfUrl && (
                                <a
                                  href={content.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 mt-2 text-sm text-blue-600 hover:underline"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  {content.skill}.pdf
                                </a>
                              )}
                              
                            </div>
                            <button
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                if (content.pdfUrl) window.open(content.pdfUrl, "_blank");
                              }}
                            >
                              Tải xuống
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ghi chú duyệt</h3>
                  <p className="text-sm text-gray-600 mb-3">Ghi chú (bắt buộc khi từ chối)</p>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    rows={4}
                    placeholder="Nhập ghi chú về quyết định duyệt hoặc lý do từ chối..."
                    value={detailRejectFeedback}
                    onChange={e => setDetailRejectFeedback(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Course Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 16.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <h3 className="font-semibold text-gray-900">
                      Thông tin{" "}
                      {selectedRequest.type === "Subject"
                        ? "khóa học"
                        : selectedRequest.type === "Chapter"
                          ? "chương"
                          : "bài học"}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {selectedRequest.type === "Subject" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">Level</p>
                          <p className="font-medium text-gray-900">{selectedRequest.level}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Chủ đề</p>
                          <p className="font-medium text-gray-900">{selectedRequest.topic}</p>
                        </div>
                      </>
                    )}

                    {(selectedRequest.type === "Chapter" || selectedRequest.type === "Unit") && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">ID Khóa học</p>
                          <p className="font-medium text-gray-900">{selectedRequest.subjectId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tên khóa học</p>
                          <p className="font-medium text-gray-900">{selectedRequest.subjectName}</p>
                        </div>
                      </>
                    )}

                    {selectedRequest.type === "Unit" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">ID Chương</p>
                          <p className="font-medium text-gray-900">{selectedRequest.chapterId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tên chương</p>
                          <p className="font-medium text-gray-900">{selectedRequest.chapterName}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Creator Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <h3 className="font-semibold text-gray-900">Người gửi yêu cầu</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedRequest.creator}</p>
                      <p className="text-sm text-gray-600">
                        {selectedRequest.creator.toLowerCase().replace(/\s+/g, "")}@email.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        Hãy xem xét kỹ lưỡng trước khi đưa ra quyết định.
                      </p>
                      <p className="text-sm text-yellow-700 mt-1">Quyết định này sẽ được ghi lại trong hệ thống.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
              <div className="flex gap-4">
                <button
                  onClick={() => approveRequest(selectedRequest.id)}
                  disabled={selectedRequest.status !== "Pending"}
                  className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Duyệt yêu cầu
                </button>
                <button
                  onClick={() => handleRejectClick(selectedRequest, true)}
                  disabled={selectedRequest.status !== "Pending"}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Từ chối yêu cầu
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const renderRejectDialog = () => (
    <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Từ chối yêu cầu</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Vui lòng nhập lý do từ chối yêu cầu "{rejectingRequest?.title}"</p>
          <Textarea
            placeholder="Nhập lý do từ chối..."
            value={rejectFeedback}
            onChange={(e) => setRejectFeedback(e.target.value)}
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleRejectSubmit} disabled={!rejectFeedback.trim()}>
            Từ chối
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Hiển thị loading khi đang fetch
  if (loading) return <div className="p-10 text-center text-lg">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen w-4/5 mx-auto bg-gray-50">
      <div className="max-w-8xl mx-auto px-6 py-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Quản lý phê duyệt yêu cầu</h1>
          <p className="text-lg text-gray-600">Xem xét và quản lý các yêu cầu từ nhân viên một cách hiệu quả.</p>
        </div>

        <Tabs defaultValue="all" className="space-y-8 bg-gray-100 rounded-xl shadow-xl" onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-4 gap-2 bg-gray-100 rounded-xl p-2">
            <TabsTrigger
              value="all"
              className="flex items-center justify-center gap-2 py-3 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-gray-200 transition-all"
            >
              <FileText className="h-5 w-5" />
              Tất cả yêu cầu
            </TabsTrigger>
            <TabsTrigger
              value="subjects"
              className="flex items-center justify-center gap-2 py-3 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-gray-200 transition-all"
            >
              <BookOpen className="h-5 w-5" />
              Khóa học
            </TabsTrigger>
            <TabsTrigger
              value="chapters"
              className="flex items-center justify-center gap-2 py-3 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-gray-200 transition-all"
            >
              <Plus className="h-5 w-5" />
              Chương
            </TabsTrigger>
            <TabsTrigger
              value="units"
              className="flex items-center justify-center gap-2 py-3 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-gray-200 transition-all"
            >
              <Clock className="h-5 w-5" />
              Bài học
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="min-h-[calc(100vh-400px)]">
            <Card className="border-0 shadow-xl rounded-xl">
              <CardHeader className="bg-blue-50 rounded-t-xl">
                <CardTitle className="text-2xl font-semibold text-gray-800">Tất cả yêu cầu</CardTitle>
                <CardDescription className="text-gray-600">Xem xét tất cả các yêu cầu đang chờ</CardDescription>
              </CardHeader>
              <CardContent className="bg-white p-6">
                {renderFilters()}
                {renderTable(paginatedRequests, ["Mã", "Tiêu đề", "Người tạo", "Trạng thái", "Ngày tạo", "Thao tác"])}

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                  <ReactPaginate
                    pageCount={pagination.totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    forcePage={pagination.currentPage}
                    containerClassName="flex items-center space-x-2"
                    pageClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    activeClassName="bg-blue-600 text-white border-blue-600"
                    previousClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    nextClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    previousLabel="Trước"
                    nextLabel="Sau"
                  />
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  Hiển thị {pagination.currentPage * pagination.itemsPerPage + 1} -{" "}
                  {Math.min((pagination.currentPage + 1) * pagination.itemsPerPage, pagination.totalItems)} của{" "}
                  {pagination.totalItems} kết quả
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="min-h-[calc(100vh-400px)]">
            <Card className="border-0 shadow-xl rounded-xl">
              <CardHeader className="bg-blue-50 rounded-t-xl">
                <CardTitle className="text-2xl font-semibold text-gray-800">Yêu cầu Khóa học</CardTitle>
                <CardDescription className="text-gray-600">Xem xét các yêu cầu liên quan đến Khóa học</CardDescription>
              </CardHeader>
              <CardContent className="bg-white p-6">
                {renderFilters()}
                {renderTable(paginatedRequests, [
                  "Mã",
                  "Level",
                  "Chủ đề",
                  "Tiêu đề",
                  "Người tạo",
                  "Trạng thái",
                  "Ngày tạo",
                  "Thao tác",
                ])}

                <div className="mt-6 flex justify-center">
                  <ReactPaginate
                    pageCount={pagination.totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    forcePage={pagination.currentPage}
                    containerClassName="flex items-center space-x-2"
                    pageClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    activeClassName="bg-blue-600 text-white border-blue-600"
                    previousClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    nextClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    previousLabel="‹"
                    nextLabel="›"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chapters" className="min-h-[calc(100vh-400px)]">
            <Card className="border-0 shadow-xl rounded-xl">
              <CardHeader className="bg-blue-50 rounded-t-xl">
                <CardTitle className="text-2xl font-semibold text-gray-800">Yêu cầu Chương</CardTitle>
                <CardDescription className="text-gray-600">Xem xét các yêu cầu liên quan đến Chương</CardDescription>
              </CardHeader>
              <CardContent className="bg-white p-6">
                {renderFilters()}
                {renderTable(paginatedRequests, [
                  "Mã",
                  "Môn học",
                  "Tiêu đề",
                  "Người tạo",
                  "Trạng thái",
                  "Ngày tạo",
                  "Thao tác",
                ])}

                <div className="mt-6 flex justify-center">
                  <ReactPaginate
                    pageCount={pagination.totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    forcePage={pagination.currentPage}
                    containerClassName="flex items-center space-x-2"
                    pageClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    activeClassName="bg-blue-600 text-white border-blue-600"
                    previousClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    nextClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    previousLabel="‹"
                    nextLabel="›"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="units" className="min-h-[calc(100vh-400px)]">
            <Card className="border-0 shadow-xl rounded-xl">
              <CardHeader className="bg-blue-50 rounded-t-xl">
                <CardTitle className="text-2xl font-semibold text-gray-800">Yêu cầu Bài học</CardTitle>
                <CardDescription className="text-gray-600">Xem xét các yêu cầu liên quan đến Bài học</CardDescription>
              </CardHeader>
              <CardContent className="bg-white p-6">
                {renderFilters()}
                {renderTable(paginatedRequests, [
                  "Mã",
                  "Môn học",
                  "Chương",
                  "Tiêu đề",
                  "Người tạo",
                  "Trạng thái",
                  "Ngày tạo",
                  "Thao tác",
                ])}

                <div className="mt-6 flex justify-center">
                  <ReactPaginate
                    pageCount={pagination.totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    forcePage={pagination.currentPage}
                    containerClassName="flex items-center space-x-2"
                    pageClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    activeClassName="bg-blue-600 text-white border-blue-600"
                    previousClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    nextClassName="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    previousLabel="‹"
                    nextLabel="›"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {renderDetailDialog()}
        {renderRejectDialog()}
      </div>
    </div>
  )
}
