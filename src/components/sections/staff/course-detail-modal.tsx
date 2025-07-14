"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Calendar,
  User,
  Clock,
  BookOpen,
  FileText,
  ImageIcon,
  Users,
  Target,
  Award,
  ChevronRight,
  Edit,
  Plus
} from "lucide-react"
import { Course } from "../entity"
import { useNavigate } from "react-router-dom"
interface CourseDetailModalProps {
  course: Course
  onClose: () => void
}

export function CourseDetailModal({ course: initialCourse, onClose }: CourseDetailModalProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [course, setCourse] = useState<any>(initialCourse)
  const [chapters, setChapters] = useState<any[]>([])
  const navigate = useNavigate()
  
  // Kiểm tra ngay khi component khởi tạo
  console.log("CourseDetailModal initialized with:", { 
    initialCourse, 
    "initialCourse.id": initialCourse?.id,
    "course state initial value": course,
    "course.id initial value": course?.id
  })

  useEffect(() => {
    // Lấy courseId từ initialCourse hoặc fallback
    const courseId = initialCourse?.id
    console.log("Initial course from props:", initialCourse);
    
    if (!courseId) {
      console.error("courseId is missing from initialCourse");
      return;
    }
    
    console.log("Fetching course data for ID:", courseId);
    
    // Gọi API lấy thông tin cơ bản
    fetch(`http://localhost:8080/api/courses/${courseId}`)
      .then(res => res.json())
      .then(res => {
        console.log("API response for course:", res);
        if (res.success && res.data) {
          console.log("Setting course data:", res.data);
          setCourse(res.data)
        }
      })
      .catch(err => console.error("Error fetching course:", err));
      
    // Gọi API lấy chi tiết chương và bài học
    fetch(`http://localhost:8080/api/courses/${courseId}/detail`)
      .then(res => res.json())
      .then(res => {
        console.log("API response for chapters:", res);
        if (res.success && res.data && res.data.chapters) setChapters(res.data.chapters)
      })
      .catch(err => console.error("Error fetching chapters:", err));
  }, [initialCourse])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "N1":
        return "bg-red-100 text-red-800 border-red-200"
      case "N2":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "N3":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "N4":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Cơ bản":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hoạt động":
        return "bg-green-100 text-green-800 border-green-200"
      case "Tạm dừng":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Nhập":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-white/20 text-white border-white/30 font-medium px-3 py-1">{course.topic}</Badge>
                <Badge className={`${getLevelColor(course.level)} font-medium px-3 py-1`}>{course.level}</Badge>
                <Badge className={`${getStatusColor(course.status)} font-medium px-3 py-1`}>{course.status}</Badge>
              </div>
              <h2 className="text-3xl font-bold mb-3 leading-tight">{course.title}</h2>
              <div className="flex items-center gap-6 text-red-100 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{course.creatorId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.chapters.length} chương</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image and Quick Info */}
            <div className="space-y-6">
              {/* Course Image */}
              <Card className="overflow-hidden shadow-lg">
                <div className="relative h-56 bg-gradient-to-br from-red-100 to-pink-100">
                  {!imageError ? (
                    <>
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                          <div className="animate-pulse flex flex-col items-center gap-2">
                            <ImageIcon className="h-10 w-10 text-red-300" />
                            <span className="text-sm text-red-400">Đang tải hình ảnh...</span>
                          </div>
                        </div>
                      )}
                      <img
                        src={course.image || "/placeholder.svg?height=224&width=400"}
                        alt={course.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          imageLoading ? "opacity-0" : "opacity-100"
                        }`}
                        onLoad={() => setImageLoading(false)}
                        onError={() => {
                          setImageError(true)
                          setImageLoading(false)
                        }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100">
                      <div className="text-center">
                        <FileText className="h-16 w-16 text-red-400 mx-auto mb-3" />
                        <span className="text-sm text-red-600 font-medium">Hình ảnh khóa học</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Quick Info */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-600" />
                    Thông tin nhanh
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">ID khóa học:</span>
                    <span className="font-semibold text-gray-900">#{course.id}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Mã khóa học:</span>
                    <span className="font-semibold text-gray-900">{course.topic}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Thứ tự:</span>
                    <span className="font-semibold text-gray-900">#{course.orderNumber}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Số chương:</span>
                    <span className="font-semibold text-gray-900">{course.chapters.length} chương</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Thời lượng:</span>
                    <span className="font-semibold text-gray-900">{course.estimatedDuration}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Dates */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Thời gian
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium mb-1">Ngày tạo:</div>
                    <div className="text-sm text-blue-800">{formatDate(course.createdAt)}</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-600 font-medium mb-1">Cập nhật lần cuối:</div>
                    <div className="text-sm text-green-800">{formatDate(course.updatedAt)}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-6 w-6 text-green-600" />
                    Mô tả khóa học
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-base">{course.description}</p>
                </CardContent>
              </Card>

              {/* Instructor Info */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Users className="h-6 w-6 text-purple-600" />
                    Thông tin giảng viên
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="bg-purple-100 p-4 rounded-full">
                      <User className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">{course.creatorId}</div>
                      <div className="text-sm text-purple-600 font-medium">Giảng viên tiếng Nhật</div>
                      <div className="text-xs text-gray-600 mt-1">Chuyên gia giảng dạy tiếng Nhật</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Stats */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Award className="h-6 w-6 text-yellow-600" />
                    Thống kê khóa học
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{chapters.length}</div>
                      <div className="text-sm text-blue-700 font-medium">Chương học</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
                      <div className="text-3xl font-bold text-green-600 mb-2">{course.duration || course.estimatedDuration}</div>
                      <div className="text-sm text-green-700 font-medium">Thời lượng</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{course.level}</div>
                      <div className="text-sm text-purple-700 font-medium">Cấp độ</div>
                    </div>
                    <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-100">
                      <div className="text-3xl font-bold text-orange-600 mb-2">{course.status}</div>
                      <div className="text-sm text-orange-700 font-medium">Trạng thái</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chapters */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                    Danh sách chương ({chapters.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {chapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-orange-100 p-3 rounded-lg">
                            <BookOpen className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">{chapter.title}</div>
                            <div className="text-sm text-gray-600">{chapter.description}</div>
                          </div>
                          <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                            {chapter.status}
                          </div>
                          {/* Nút thêm bài học */}
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white ml-2"
                            onClick={(e) => {
                              // Ngăn chặn các hành vi mặc định và event bubbling
                              e.preventDefault();
                              e.stopPropagation();
                              
                              // Đóng modal trước khi chuyển hướng
                              if (typeof onClose === 'function') {
                                onClose();
                              }
                              
                              // Log chi tiết hơn để debug
                              console.log("Modal - Add Unit button clicked", { 
                                courseId: course.id, 
                                chapterId: chapter.id,
                                courseType: typeof course.id,
                                chapterType: typeof chapter.id
                              });
                              
                              // Sử dụng navigate thay vì window.location để duy trì client-side routing
                              navigate(`/addunit/${course.id}/${chapter.id}`);
                              
                              // Ngăn chặn các sự kiện khác
                              return false;
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Thêm bài học
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white ml-2"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Try direct link opening in a new tab
                              console.log("Test button clicked");
                              const targetUrl = `/addunit/${course.id}/${chapter.id}`;
                              window.open(targetUrl, '_blank');
                            }}
                          >
                            Test Link
                          </Button>
                          <Button
                            size="sm"
                            className="bg-amber-500 hover:bg-amber-600 text-white ml-2"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              
                              if (typeof onClose === 'function') {
                                onClose();
                              }
                              
                              // Thử route tester với cùng params
                              const testUrl = `/test-route/${course.id}/${chapter.id}`;
                              console.log("Testing route tester URL:", testUrl);
                              
                              // Sử dụng navigate thay vì window.location để duy trì client-side routing
                              navigate(testUrl);
                            }}
                          >
                            Test Route
                          </Button>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                        {/* Units */}
                        {chapter.units && chapter.units.length > 0 && (
                          <div className="pl-12 pt-2 space-y-2">
                            {chapter.units.map((unit: any) => (
                              <div key={unit.id} className="flex items-center gap-3 py-2 px-4 bg-white rounded border border-blue-100">
                                <div className="w-7 h-7 bg-blue-200 rounded-full flex items-center justify-center">
                                  <span className="text-xs text-blue-700 font-medium">{unit.title}</span>
                                </div>
                                <span className="text-blue-700 font-medium">{unit.title}</span>
                                <span className="text-xs text-gray-500 ml-2">{unit.status}</span>
                                <span className="text-xs text-gray-400 ml-2">{unit.description}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => {
              window.open('/addchapter/course-01', '_blank');
            }} className="px-6 bg-amber-500 text-white">
              Test Direct Link
            </Button>
            <Button variant="outline" onClick={onClose} className="px-6">
              Đóng
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 px-6 text-white"
              onClick={() => {
                // Lấy courseId từ cả hai nguồn có thể
                const courseId = course?.id || initialCourse?.id || "course-01";
                
                console.log("Using courseId:", courseId);
                console.log("courseId type:", typeof courseId);
                console.log("initialCourse:", initialCourse);
                
                // Sử dụng useNavigate thay vì window.location
                try {
                  navigate(`/addchapter/${courseId}`);
                } catch (error) {
                  console.error("Navigation error:", error);
                  
                  // Fallback nếu navigate không hoạt động
                  window.location.href = `/addchapter/${courseId}`;
                }
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm chương
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 px-6">
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa khóa học
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
