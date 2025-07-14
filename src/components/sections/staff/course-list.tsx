"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import type { Course } from "../entity"
import { useNavigate } from "react-router-dom"

interface CourseListPageProps {
  courses: Course[]
  onViewDetails: (course: Course) => void
  onAddCourse: () => void
}

export function CourseListPage({ onViewDetails, onAddCourse }: CourseListPageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/courses");
        const data = await response.json();
        if (response.ok && data.success && Array.isArray(data.data)) {
          setCourses(data.data);
        } else {
          setCourses([]);
        }
      } catch (err) {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [])

  // Get unique levels and statuses for filters
  const uniqueLevels = Array.from(new Set(courses.map((course) => course.level)))
  const uniqueStatuses = Array.from(new Set(courses.map((course) => course.status)))

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        (course.title && course.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (course.id !== undefined && course.id !== null && course.id.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
      const matchesStatus = selectedStatus === "all" || course.status === selectedStatus

      return matchesSearch && matchesLevel && matchesStatus
    })
  }, [courses, searchTerm, selectedLevel, selectedStatus])

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCourses = filteredCourses.slice(startIndex, endIndex)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "BEGINNER":
        return "bg-green-200 text-green-800 border-green-300";
      case "INTERMEDIATE":
        return "bg-orange-200 text-orange-800 border-orange-300";
      case "ADVANCED":
        return "bg-red-200 text-red-800 border-red-300";
      default:
        return "bg-gray-200 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500 text-white border-green-600";
      case "DRAFT":
        return "bg-yellow-400 text-yellow-900 border-yellow-500";
      case "Nhập":
        return "bg-red-200 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  }

  function handleEditCourse(course: Course): void {
    throw new Error("Function not implemented.")
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Danh sách khóa học</h1>
              <p className="text-blue-600 mt-1">Quản lý tất cả các khóa học trong hệ thống</p>
            </div>
            <Button onClick={onAddCourse} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Thêm môn học
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 rounded-xl border border-blue-300 p-8 mb-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            {/* Search */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                <Input
                  placeholder="Tìm kiếm khóa học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 border-blue-400 focus:border-blue-600 focus:ring-blue-600 bg-white/80 rounded-lg shadow-sm text-base"
                />
              </div>
            </div>
            {/* Level Filter */}
            <div className="md:col-span-1">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="border-blue-400 focus:border-blue-600 focus:ring-blue-600 bg-white/80 rounded-lg shadow-sm text-base">
                  <SelectValue placeholder="Tất cả mức độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả mức độ</SelectItem>
                  {uniqueLevels.map((level) => (
                    <SelectItem key={level} value={level} className="text-base">{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Status Filter */}
            <div className="md:col-span-1">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="border-blue-400 focus:border-blue-600 focus:ring-blue-600 bg-white/80 rounded-lg shadow-sm text-base">
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status} className="text-base">{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Results Count */}
            <div className="md:col-span-1 text-right">
              <span className="text-base text-blue-700 bg-blue-200 px-4 py-2 rounded-full font-semibold shadow-sm">
                Tìm thấy {filteredCourses.length} khóa học
              </span>
            </div>
          </div>
        </div>

        {/* Course Table */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="grid grid-cols-12 gap-4 px-8 py-4 text-sm font-bold tracking-wide">
              <div className="col-span-1">STT</div>
              <div className="col-span-2">ID</div>
              <div className="col-span-3">Tên khóa học</div>
              <div className="col-span-2">Mức độ</div>
              <div className="col-span-2">Trạng thái</div>
              <div className="col-span-2">Xem chi tiết</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-blue-100">
            {isLoading ? (
              <div className="px-8 py-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="text-blue-400">
                  <p className="text-xl font-semibold mb-2 text-blue-700">Đang tải dữ liệu...</p>
                  <p className="text-base text-blue-600">Vui lòng chờ trong giây lát</p>
                </div>
              </div>
            ) : currentCourses.length === 0 ? (
              <div className="px-8 py-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="text-blue-400">
                  <Search className="h-14 w-14 mx-auto mb-6 opacity-60" />
                  <p className="text-xl font-semibold mb-2 text-blue-700">Không tìm thấy khóa học</p>
                  <p className="text-base text-blue-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                </div>
              </div>
            ) : (
              currentCourses.map((course, index) => (
                <div key={course.id} className="grid grid-cols-12 gap-4 px-8 py-3 hover:bg-blue-50 transition-all duration-200 rounded-xl items-center">
                  <div className="col-span-1 text-xs text-blue-900 font-semibold">{startIndex + index + 1}</div>
                  <div className="col-span-2 text-xs font-bold text-blue-700">{course.id}</div>
                  <div className="col-span-3">
                    <div className="text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors duration-150 cursor-pointer">
                      {course.title}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm border ${getLevelColor(course.level)}`}>{course.level}</Badge>
                  </div>
                  <div className="col-span-2">
                    <Badge className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm border ${getStatusColor(course.status)}`}>{course.status}</Badge>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/detail/${course.id}`, { state: { course } })}
                      className="h-8 w-8 p-0 hover:bg-blue-600 hover:text-white transition-colors rounded-full border border-blue-200 shadow"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/updatecourse`, { state: { course } })}
                      className="h-8 w-8 p-0 hover:bg-green-600 hover:text-white transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        // onClick={() => handleDeleteCourse(course.id)}
                        className="h-8 w-8 p-0 hover:bg-red-600 hover:text-white transition-colors"
                        title="Xóa"
                      >  <Trash2 className="h-4 w-4" />
                      </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Pagination giữ nguyên */}
          {filteredCourses.length > 0 && (
            <div className="bg-blue-50 border-t border-blue-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-blue-700 font-medium">
                  Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredCourses.length)} trong tổng số{" "}
                  {filteredCourses.length} khóa học
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
        </div>
      </div>
    </div>
  )
}

