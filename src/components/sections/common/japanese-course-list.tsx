

import { useEffect, useState } from "react"
import { Search,Clock, Users,Award, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAPI } from "@/hooks/useAPI"
import URLMapping from "@/utils/URLMapping"
import { useNavigate } from "react-router-dom"

// Sample Japanese course data

export default function JapaneseCourseList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedLevel, setSelectedLevel] = useState("Tất cả")
  const [sortBy, setSortBy] = useState("Mới nhất")
  const [japaneseCourses, setJapaneseCourses] = useState<any[]>([]);
  const { API } = useAPI();
  const navigate = useNavigate()

  useEffect(() => {
    loadData();
  }, []);

  const [pagination, setPagination] = useState({ totalElements: 0, totalPages: 0 });

  const loadData = async () => {
    const response = await API.get(URLMapping.LIST_COURSE);
    setJapaneseCourses(response.content);
    setPagination({
      totalElements: response.totalElements,
      totalPages: response.totalPages,
    });
  };

  const filteredCourses = japaneseCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "Tất cả" || course.topic === selectedCategory;
    const matchesLevel = selectedLevel === "Tất cả" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-red-600">🇯🇵</span>
                  Khóa học tiếng Nhật
                </h1>
                <p className="text-gray-600 mt-1">Học tiếng Nhật từ cơ bản đến nâng cao - Chuẩn bị thi JLPT</p>
              </div>
              <div className="text-sm text-gray-600">{filteredCourses.length} khóa học</div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm khóa học tiếng Nhật..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-red-200 focus:border-red-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-red-100 hover:border-red-200"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold">JLPT {course.level}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg line-clamp-2 text-gray-900 flex-1">{course.title}</h3>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div></div>
                    <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                      {course.topic}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{course.estimatedDuration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Target className="h-4 w-4" />
                      <span>JLPT {course.level}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-600">Miễn phí</span>
                  </div>
                  <Button onClick={() => { navigate(`/coursedetail/${course.id}`) }} className="bg-red-600 hover:bg-red-700 text-white">Học ngay</Button>
                </div>
              </CardFooter>
            </Card>
          ))}

        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🇯🇵</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa học nào</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredCourses.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="border-red-200 text-red-600 hover:bg-red-50">
              Xem thêm khóa học
            </Button>
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-red-600 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🎌 Tại sao chọn học tiếng Nhật với chúng tôi?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex flex-col items-center">
                <Award className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Chuẩn JLPT</h3>
                <p className="text-sm opacity-90">Nội dung theo chuẩn thi JLPT chính thức</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Giáo viên bản ngữ</h3>
                <p className="text-sm opacity-90">Học với sensei người Nhật kinh nghiệm</p>
              </div>
              <div className="flex flex-col items-center">
                <Target className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Thực hành thực tế</h3>
                <p className="text-sm opacity-90">Luyện tập trong tình huống thực tế</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
