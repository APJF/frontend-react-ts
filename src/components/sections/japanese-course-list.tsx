"use client"

import { useState } from "react"
import { Search, Filter, Star, Clock, Users, BookOpen, ChevronDown, Award, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample Japanese course data
const japaneseCourses = [
  {
    id: 1,
    title: "Tiếng Nhật N5 - Khởi đầu hoàn hảo",
    description: "Học tiếng Nhật từ con số 0 với Hiragana, Katakana và 800 từ vựng cơ bản",
    image: "/placeholder.svg?height=200&width=300",
    price: "899,000",
    originalPrice: "1,299,000",
    rating: 4.9,
    students: 3247,
    duration: "60 giờ",
    level: "N5",
    instructor: "Sensei Tanaka",
    category: "Cơ bản",
    vocabulary: "800 từ",
    grammar: "45 ngữ pháp",
    isHot: true,
    isBestseller: true,
  },
  {
    id: 2,
    title: "JLPT N4 - Tiến bước vững chắc",
    description: "Nâng cao kỹ năng với 1500 từ vựng và các cấu trúc ngữ pháp phức tạp hơn",
    image: "/placeholder.svg?height=200&width=300",
    price: "1,199,000",
    originalPrice: "1,699,000",
    rating: 4.8,
    students: 2156,
    duration: "80 giờ",
    level: "N4",
    instructor: "Sensei Yamada",
    category: "Trung cấp",
    vocabulary: "1500 từ",
    grammar: "65 ngữ pháp",
    isHot: false,
    isBestseller: true,
  },
  {
    id: 3,
    title: "Kanji Master - Làm chủ chữ Hán",
    description: "Học 1000+ chữ Kanji thông dụng với phương pháp ghi nhớ hiệu quả",
    image: "/placeholder.svg?height=200&width=300",
    price: "799,000",
    originalPrice: "1,199,000",
    rating: 4.7,
    students: 1834,
    duration: "45 giờ",
    level: "N5-N3",
    instructor: "Sensei Sato",
    category: "Chữ viết",
    vocabulary: "1000+ Kanji",
    grammar: "Onyomi/Kunyomi",
    isHot: true,
    isBestseller: false,
  },
  {
    id: 4,
    title: "Giao tiếp tiếng Nhật hàng ngày",
    description: "Thực hành hội thoại trong các tình huống thực tế tại Nhật Bản",
    image: "/placeholder.svg?height=200&width=300",
    price: "1,099,000",
    originalPrice: "1,599,000",
    rating: 4.8,
    students: 2567,
    duration: "50 giờ",
    level: "N4-N3",
    instructor: "Sensei Watanabe",
    category: "Giao tiếp",
    vocabulary: "Hội thoại",
    grammar: "Thực hành",
    isHot: false,
    isBestseller: true,
  },
  {
    id: 5,
    title: "JLPT N3 - Trung cấp tiến bộ",
    description: "Chuẩn bị thi N3 với 3000 từ vựng và ngữ pháp trung cấp",
    image: "/placeholder.svg?height=200&width=300",
    price: "1,499,000",
    originalPrice: "2,199,000",
    rating: 4.9,
    students: 1923,
    duration: "100 giờ",
    level: "N3",
    instructor: "Sensei Kobayashi",
    category: "Trung cấp",
    vocabulary: "3000 từ",
    grammar: "85 ngữ pháp",
    isHot: true,
    isBestseller: false,
  },
  {
    id: 6,
    title: "Văn hóa Nhật Bản qua ngôn ngữ",
    description: "Tìm hiểu văn hóa, phong tục tập quán Nhật Bản qua các bài học ngôn ngữ",
    image: "/placeholder.svg?height=200&width=300",
    price: "699,000",
    originalPrice: "999,000",
    rating: 4.6,
    students: 1456,
    duration: "35 giờ",
    level: "N5-N4",
    instructor: "Sensei Nakamura",
    category: "Văn hóa",
    vocabulary: "Văn hóa",
    grammar: "Keigo cơ bản",
    isHot: false,
    isBestseller: false,
  },
  {
    id: 7,
    title: "Business Japanese - Tiếng Nhật thương mại",
    description: "Tiếng Nhật chuyên ngành cho môi trường công việc và kinh doanh",
    image: "/placeholder.svg?height=200&width=300",
    price: "1,799,000",
    originalPrice: "2,499,000",
    rating: 4.7,
    students: 987,
    duration: "75 giờ",
    level: "N2-N1",
    instructor: "Sensei Suzuki",
    category: "Thương mại",
    vocabulary: "Business",
    grammar: "Keigo nâng cao",
    isHot: false,
    isBestseller: false,
  },
  {
    id: 8,
    title: "JLPT N2 - Tiền cao cấp",
    description: "Chinh phục N2 với 6000 từ vựng và ngữ pháp phức tạp",
    image: "/placeholder.svg?height=200&width=300",
    price: "1,899,000",
    originalPrice: "2,699,000",
    rating: 4.8,
    students: 1234,
    duration: "120 giờ",
    level: "N2",
    instructor: "Sensei Takahashi",
    category: "Cao cấp",
    vocabulary: "6000 từ",
    grammar: "120 ngữ pháp",
    isHot: true,
    isBestseller: false,
  },
]

const categories = ["Tất cả", "Cơ bản", "Trung cấp", "Cao cấp", "Giao tiếp", "Chữ viết", "Văn hóa", "Thương mại"]
const levels = ["Tất cả", "N5", "N4", "N3", "N2", "N1", "N5-N4", "N4-N3", "N2-N1", "N5-N3"]
const sortOptions = ["Mới nhất", "Phổ biến nhất", "Giá thấp đến cao", "Giá cao đến thấp", "Đánh giá cao nhất"]

export default function JapaneseCourseList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedLevel, setSelectedLevel] = useState("Tất cả")
  const [sortBy, setSortBy] = useState("Mới nhất")

  const filteredCourses = japaneseCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tất cả" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "Tất cả" || course.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

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

            {/* Search and Filters */}
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

              {/* Filters */}
              
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
                  <div className="absolute top-3 left-3 flex gap-2">
                    {course.isHot && <Badge className="bg-red-500 hover:bg-red-600">🔥 HOT</Badge>}
                    {course.isBestseller && <Badge className="bg-yellow-500 hover:bg-yellow-600">⭐ Bestseller</Badge>}
                  </div>
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

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-medium">👨‍🏫 {course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-gray-500">({course.students.toLocaleString()})</span>
                    </div>
                    <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                      {course.category}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.vocabulary}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Target className="h-4 w-4" />
                      <span>{course.grammar}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-600">{course.price}₫</span>
                    <span className="text-sm text-gray-500 line-through">{course.originalPrice}₫</span>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Học ngay</Button>
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
