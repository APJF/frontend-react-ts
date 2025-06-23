"use client";

import { Header } from "@/components/layout/header";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, BookOpen, Clock, Check, X, Plus } from "lucide-react";

interface Request {
  id: number;
  type: "Subject" | "Chapter" | "Unit";
  action: "Add" | "Update" | "Delete";
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

  // Optional skill field
  skill?: "Kanji" | "Từ vựng" | "Ngữ pháp" | "Đọc hiểu" | "Nghe";
}

export default function ManagerApprovalInterface() {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      type: "Subject",
      action: "Add",
      title: "Tiếng Nhật cơ bản - Khóa học nhập môn dành cho người mới bắt đầu",
      creator: "Nguyễn Văn A",
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      level: "N5",
      topic: "Giao tiếp hàng ngày",
      description: "Khóa học tiếng Nhật cơ bản dành cho người mới bắt đầu với nội dung chi tiết",
      estimatedDuration: 120,
      image: "/placeholder.svg?height=200&width=300",
      orderNumber: 1,
    },
    {
      id: 2,
      type: "Chapter",
      action: "Update",
      title: "Chào hỏi và giới thiệu - Bài học cơ bản dài dòng",
      creator: "Trần Thị B",
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subjectId: "SUB001",
      subjectName: "Tiếng Nhật cơ bản",
      description: "Học cách chào hỏi và giới thiệu bản thân bằng tiếng Nhật với nội dung chi tiết",
      orderNumber: 1,
    },
    {
      id: 3,
      type: "Unit",
      action: "Delete",
      title: "Bài 1: Xin chào - Bài học dài dòng và phức tạp",
      creator: "Lê Văn C",
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subjectId: "SUB001",
      subjectName: "Tiếng Nhật cơ bản",
      chapterId: "CHA001",
      chapterName: "Chào hỏi và giới thiệu",
      description: "Học các cách chào hỏi cơ bản trong tiếng Nhật với nội dung rất dài dòng",
      orderNumber: 1,
      skill: "Từ vựng",
    },
    {
      id: 4,
      type: "Subject",
      action: "Add",
      title: "Tiếng Nhật trung cấp - Khóa học nâng cao cho người đã có nền tảng",
      creator: "Phạm Thị D",
      status: "Approved",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      level: "N3",
      topic: "Giao tiếp công việc",
      description: "Khóa học tiếng Nhật trung cấp cho môi trường công việc với nội dung chi tiết",
      estimatedDuration: 180,
      image: "/placeholder.svg?height=200&width=300",
      orderNumber: 2,
    },
    {
      id: 5,
      type: "Unit",
      action: "Update",
      title: "Bài 2: Kanji cơ bản - Học ký tự phức tạp",
      creator: "Hoàng Văn E",
      status: "Rejected",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subjectId: "SUB001",
      subjectName: "Tiếng Nhật cơ bản",
      chapterId: "CHA002",
      chapterName: "Chữ viết",
      description: "Học các Kanji cơ bản thường dùng với nội dung rất dài dòng và phức tạp",
      orderNumber: 2,
      skill: "Kanji",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const approveRequest = (id: number) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
    );
  };

  const rejectRequest = (id: number) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    );
  };

  const handleRowClick = (request: Request) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const renderDetailDialog = () => {
    if (!selectedRequest) return null;

    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl bg-white rounded-xl shadow-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              Chi tiết {selectedRequest.type}: {selectedRequest.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-gray-700">
            {selectedRequest.type === "Subject" && (
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Tên:</strong>
                  <span className="mt-1">{selectedRequest.title}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Level:</strong>
                  <span className="mt-1">{selectedRequest.level}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Topic:</strong>
                  <span className="mt-1">{selectedRequest.topic}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Thời lượng ước tính:</strong>
                  <span className="mt-1">{selectedRequest.estimatedDuration} phút</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Thứ tự:</strong>
                  <span className="mt-1">{selectedRequest.orderNumber}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Người tạo:</strong>
                  <span className="mt-1">{selectedRequest.creator}</span>
                </div>
                <div className="col-span-2 flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Mô tả:</strong>
                  <span className="mt-1">{selectedRequest.description}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Ngày tạo:</strong>
                  <span className="mt-1">{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Ngày cập nhật:</strong>
                  <span className="mt-1">{new Date(selectedRequest.updatedAt).toLocaleString()}</span>
                </div>
                {selectedRequest.image && (
                  <div className="col-span-2 flex flex-col">
                    <strong className="text-sm font-medium text-gray-600">Hình ảnh:</strong>
                    <img
                      src={selectedRequest.image || "/placeholder.svg"}
                      alt="Subject"
                      className="mt-2 rounded-lg max-w-full h-48 object-cover border border-gray-200"
                    />
                  </div>
                )}
              </div>
            )}

            {selectedRequest.type === "Chapter" && (
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Tên:</strong>
                  <span className="mt-1">{selectedRequest.title}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Mã môn học:</strong>
                  <span className="mt-1">{selectedRequest.subjectId}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Tên môn học:</strong>
                  <span className="mt-1">{selectedRequest.subjectName}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Thứ tự:</strong>
                  <span className="mt-1">{selectedRequest.orderNumber}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Người tạo:</strong>
                  <span className="mt-1">{selectedRequest.creator}</span>
                </div>
                <div className="col-span-2 flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Mô tả:</strong>
                  <span className="mt-1">{selectedRequest.description}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Ngày tạo:</strong>
                  <span className="mt-1">{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Ngày cập nhật:</strong>
                  <span className="mt-1">{new Date(selectedRequest.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            )}

            {selectedRequest.type === "Unit" && (
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Tên:</strong>
                  <span className="mt-1">{selectedRequest.title}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Mã chapter:</strong>
                  <span className="mt-1">{selectedRequest.chapterId}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Tên chapter:</strong>
                  <span className="mt-1">{selectedRequest.chapterName}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Mã môn học:</strong>
                  <span className="mt-1">{selectedRequest.subjectId}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Tên môn học:</strong>
                  <span className="mt-1">{selectedRequest.subjectName}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Thứ tự:</strong>
                  <span className="mt-1">{selectedRequest.orderNumber}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Skill:</strong>
                  <span className="mt-1">{selectedRequest.skill}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Người tạo:</strong>
                  <span className="mt-1">{selectedRequest.creator}</span>
                </div>
                <div className="col-span-2 flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Mô tả:</strong>
                  <span className="mt-1">{selectedRequest.description}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Ngày tạo:</strong>
                  <span className="mt-1">{new Date(selectedRequest.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm font-medium text-gray-600">Ngày cập nhật:</strong>
                  <span className="mt-1">{new Date(selectedRequest.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100">
      
      <div className="w-4/5 mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Manager Approval Interface</h1>
          <p className="text-lg text-gray-600"></p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-1 bg-gray-200 rounded-lg p-2 h-20">
            <TabsTrigger
              value="all"
              className="flex items-center justify-center gap-2 p-4 rounded-md h-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-gray-100 transition-all text-center"
            >
              <FileText className="h-5 w-5" />
              Tất cả yêu cầu
            </TabsTrigger>
            <TabsTrigger
              value="subjects"
              className="flex items-center justify-center gap-2 p-4 rounded-md h-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-gray-100 transition-all text-center"
            >
              <BookOpen className="h-5 w-5" />
              Yêu cầu của khóa học
            </TabsTrigger>
            <TabsTrigger
              value="chapters"
              className="flex items-center justify-center gap-2 p-4 rounded-md h-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-gray-100 transition-all text-center"
            >
              <Plus className="h-5 w-5" />
              Yêu cầu của chương
            </TabsTrigger>
            <TabsTrigger
              value="units"
              className="flex items-center justify-center gap-2 p-4 rounded-md h-full data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm hover:bg-gray-100 transition-all text-center"
            >
              <Clock className="h-5 w-5" />
              Yêu cầu của bài 
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="min-h-[calc(100vh-400px)] max-h-[calc(100vh-300px)] overflow-y-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl font-semibold text-gray-800">Tất cả yêu cầu</CardTitle>
                <CardDescription className="text-gray-600">Xem xét tất cả các yêu cầu đang chờ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full w-[1200px] divide-y divide-gray-200"> {/* Tăng chiều rộng bảng */}
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Mã</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Tiêu đề</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Người tạo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Hành động</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Trạng thái</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Ngày tạo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests.map((req) => (
                        <tr
                          key={req.id}
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleRowClick(req)}
                        >
                          <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.id}</td>
                          <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.title}</td>
                          <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.creator}</td>
                          <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-sm ${
                                req.action === "Add"
                                  ? "bg-blue-600"
                                  : req.action === "Update"
                                    ? "bg-orange-600"
                                    : "bg-red-600"
                              }`}
                            >
                              {req.action}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                            <span
                              className={`px-3 py-1 rounded-full text-white text-sm ${
                                req.status === "Pending"
                                  ? "bg-yellow-600"
                                  : req.status === "Approved"
                                    ? "bg-green-600"
                                    : "bg-red-600"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{new Date(req.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-normal break-words max-w-xs" onClick={(e) => e.stopPropagation()}>
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
                              onClick={() => rejectRequest(req.id)}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="min-h-[calc(100vh-400px)] max-h-[calc(100vh-300px)] overflow-y-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl font-semibold text-gray-800">Yêu cầu Khóa học</CardTitle>
                <CardDescription className="text-gray-600">Xem xét các yêu cầu liên quan đến Khóa học</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full w-[1200px] divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Mã</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Chủ đề</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Tiêu đề</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Người tạo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Hành động</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Trạng thái</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Ngày tạo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests
                        .filter((req) => req.type === "Subject")
                        .map((req) => (
                          <tr
                            key={req.id}
                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => handleRowClick(req)}
                          >
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.id}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.level}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.topic}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.title}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.creator}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                              <span
                                className={`px-3 py-1 rounded-full text-white text-sm ${
                                  req.action === "Add"
                                    ? "bg-blue-600"
                                    : req.action === "Update"
                                      ? "bg-orange-600"
                                      : "bg-red-600"
                                }`}
                              >
                                {req.action}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                              <span
                                className={`px-3 py-1 rounded-full text-white text-sm ${
                                  req.status === "Pending"
                                    ? "bg-yellow-600"
                                    : req.status === "Approved"
                                      ? "bg-green-600"
                                      : "bg-red-600"
                                }`}
                              >
                                {req.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{new Date(req.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs" onClick={(e) => e.stopPropagation()}>
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
                                onClick={() => rejectRequest(req.id)}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chapters" className="min-h-[calc(100vh-400px)] max-h-[calc(100vh-300px)] overflow-y-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl font-semibold text-gray-800">Yêu cầu Chapter</CardTitle>
                <CardDescription className="text-gray-600">Xem xét các yêu cầu liên quan đến Chapter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full w-[1200px] divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Mã</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Môn học</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Tiêu đề</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Người tạo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Hành động</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Trạng thái</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Ngày tạo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests
                        .filter((req) => req.type === "Chapter")
                        .map((req) => (
                          <tr
                            key={req.id}
                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => handleRowClick(req)}
                          >
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.id}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.subjectName}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.title}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.creator}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                              <span
                                className={`px-3 py-1 rounded-full text-white text-sm ${
                                  req.action === "Add"
                                    ? "bg-blue-600"
                                    : req.action === "Update"
                                      ? "bg-orange-600"
                                      : "bg-red-600"
                                }`}
                              >
                                {req.action}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                              <span
                                className={`px-3 py-1 rounded-full text-white text-sm ${
                                  req.status === "Pending"
                                    ? "bg-yellow-600"
                                    : req.status === "Approved"
                                      ? "bg-green-600"
                                      : "bg-red-600"
                                }`}
                              >
                                {req.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{new Date(req.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs" onClick={(e) => e.stopPropagation()}>
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
                                onClick={() => rejectRequest(req.id)}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="units" className="min-h-[calc(100vh-400px)] max-h-[calc(100vh-300px)] overflow-y-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-xl font-semibold text-gray-800">Yêu cầu Unit</CardTitle>
                <CardDescription className="text-gray-600">Xem xét các yêu cầu liên quan đến Unit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full w-[1200px] divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Mã</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Môn học</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Chương</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Tiêu đề</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Người tạo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Hành động</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Trạng thái</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Ngày tạo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests
                        .filter((req) => req.type === "Unit")
                        .map((req) => (
                          <tr
                            key={req.id}
                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => handleRowClick(req)}
                          >
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.id}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.subjectName}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.chapterName}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.title}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{req.creator}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                              <span
                                className={`px-3 py-1 rounded-full text-white text-sm ${
                                  req.action === "Add"
                                    ? "bg-blue-600"
                                    : req.action === "Update"
                                      ? "bg-orange-600"
                                      : "bg-red-600"
                                }`}
                              >
                                {req.action}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">
                              <span
                                className={`px-3 py-1 rounded-full text-white text-sm ${
                                  req.status === "Pending"
                                    ? "bg-yellow-600"
                                    : req.status === "Approved"
                                      ? "bg-green-600"
                                      : "bg-red-600"
                                }`}
                              >
                                {req.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs">{new Date(req.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-normal break-words max-w-xs" onClick={(e) => e.stopPropagation()}>
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
                                onClick={() => rejectRequest(req.id)}
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {renderDetailDialog()}
      </div>
    </div>
    </>
    
  );
}