"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus, Search } from "lucide-react"
import type { Subject } from "./entity"

interface CourseListPageProps {
  courses: Subject[]
  onViewDetails: (course: Subject) => void
  onAddCourse: () => void
}

export function CourseListPage({ courses, onViewDetails, onAddCourse }: CourseListPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Get unique levels and statuses for filters
  const uniqueLevels = Array.from(new Set(courses.map((course) => course.level)))
  const uniqueStatuses = Array.from(new Set(courses.map((course) => course.status)))

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.creatorId.toLowerCase().includes(searchTerm.toLowerCase())

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
      case "N1":
        return "bg-red-600 text-white"
      case "N2":
        return "bg-blue-600 text-white"
      case "N3":
        return "bg-orange-600 text-white"
      case "N4":
        return "bg-purple-600 text-white"
      case "N5":
        return "bg-green-600 text-white"
      case "Cơ bản":
        return "bg-emerald-600 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoạt động":
        return "bg-blue-600 text-white"
      case "Tạm dừng":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300"
      case "Nhập":
        return "bg-blue-100 text-blue-800 border border-blue-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
        <div className="bg-white rounded-lg border border-blue-200 p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Search */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input
                  placeholder="Tìm kiếm khóa học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Level Filter */}
            <div className="md:col-span-1">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Tất cả mức độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả mức độ</SelectItem>
                  {uniqueLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="md:col-span-1">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="border-blue-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="md:col-span-1 text-right">
              <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">
                Tìm thấy {filteredCourses.length} khóa học
              </span>
            </div>
          </div>
        </div>

        {/* Course Table */}
        <div className="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-blue-600 text-white">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium">
              <div className="col-span-1">STT</div>
              <div className="col-span-1">ID</div>
              <div className="col-span-4">Tên khóa học</div>
              <div className="col-span-1">Mức độ</div>
              <div className="col-span-2">Giảng viên</div>
              <div className="col-span-2">Trạng thái</div>
              <div className="col-span-1">Xem chi tiết</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-blue-100">
            {currentCourses.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-blue-500">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2 text-blue-700">Không tìm thấy khóa học</p>
                  <p className="text-sm text-blue-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                </div>
              </div>
            ) : (
              currentCourses.map((course, index) => (
                <div key={course.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-blue-50 transition-colors">
                  <div className="col-span-1 text-sm text-blue-900 font-medium">{startIndex + index + 1}</div>
                  <div className="col-span-1 text-sm font-bold text-blue-700">{course.topic}</div>
                  <div className="col-span-4">
                    <div className="text-sm font-medium text-blue-900">{course.title}</div>
                  </div>
                  <div className="col-span-1">
                    <Badge className={`${getLevelColor(course.level)} text-xs font-medium`}>{course.level}</Badge>
                  </div>
                  <div className="col-span-2 text-sm text-blue-700 font-medium">{course.creatorId}</div>
                  <div className="col-span-2">
                    <Badge className={`${getStatusColor(course.status)} text-xs font-medium`}>{course.status}</Badge>
                  </div>
                  <div className="col-span-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewDetails(course)}
                      className="h-8 w-8 p-0 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
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
