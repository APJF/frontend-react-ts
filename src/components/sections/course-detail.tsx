

import { useState, useEffect, useCallback } from "react"
import {
  ArrowLeft,
  Star,
  Clock,
  BookOpen,
  Target,
  Play,
  Download,
  Share2,
  Heart,
  Award,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useAPI } from "@/hooks/useAPI"
import URLMapping from "@/utils/URLMapping"
import { useParams } from "react-router-dom"


interface Course {
  id: number
  title: string
  description: string
  image: string
  price: string
  originalPrice: string
  rating: number
  students: number
  duration: string
  level: string
  instructor: string
  category: string
  vocabulary: string
  grammar: string
  isHot: boolean
  isBestseller: boolean
}

const curriculum = [
  {
    id: 1,
    title: "Chương 1: Giới thiệu về tiếng Nhật",
    lessons: [
      { id: 1, title: "Lịch sử và đặc điểm của tiếng Nhật", duration: "15 phút", isCompleted: false },
      { id: 2, title: "Hệ thống chữ viết Nhật Bản", duration: "20 phút", isCompleted: false },
      { id: 3, title: "Cách phát âm cơ bản", duration: "25 phút", isCompleted: false },
    ],
  },
  {
    id: 2,
    title: "Chương 2: Hiragana - Bảng chữ cái đầu tiên",
    lessons: [
      { id: 4, title: "Học Hiragana あ-の", duration: "30 phút", isCompleted: false },
      { id: 5, title: "Học Hiragana は-ん", duration: "30 phút", isCompleted: false },
      { id: 6, title: "Luyện tập viết Hiragana", duration: "45 phút", isCompleted: false },
      { id: 7, title: "Bài kiểm tra Hiragana", duration: "20 phút", isCompleted: false },
    ],
  },
  {
    id: 3,
    title: "Chương 3: Katakana - Bảng chữ cái thứ hai",
    lessons: [
      { id: 8, title: "Học Katakana ア-ノ", duration: "30 phút", isCompleted: false },
      { id: 9, title: "Học Katakana ハ-ン", duration: "30 phút", isCompleted: false },
      { id: 10, title: "Từ vựng ngoại lai với Katakana", duration: "40 phút", isCompleted: false },
    ],
  },
  {
    id: 4,
    title: "Chương 4: Từ vựng và ngữ pháp cơ bản",
    lessons: [
      { id: 11, title: "Chào hỏi và giới thiệu bản thân", duration: "35 phút", isCompleted: false },
      { id: 12, title: "Số đếm và thời gian", duration: "40 phút", isCompleted: false },
      { id: 13, title: "Gia đình và nghề nghiệp", duration: "45 phút", isCompleted: false },
    ],
  },
]

const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    rating: 5,
    comment: "Khóa học rất chi tiết và dễ hiểu. Sensei dạy rất tận tâm!",
    date: "2 tuần trước",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Trần Thị B",
    rating: 5,
    comment: "Tôi đã học được rất nhiều từ khóa học này. Phương pháp giảng dạy rất hay!",
    date: "1 tháng trước",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Lê Văn C",
    rating: 4,
    comment: "Nội dung phong phú, bài tập thực hành nhiều. Rất đáng tiền!",
    date: "3 tuần trước",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function CourseDetail() {
  // const [course, setCourse] = useState<Course | null>(null)
  // const [isWishlisted, setIsWishlisted] = useState(false)
  const [japaneseCourses, setJapaneseCourses] = useState<any[]>([]);
  const { API } = useAPI();
  
  const { id } = useParams();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await API.get(URLMapping.SUBJECT_ID+"?id=" +id);
    console.log(response);
    setJapaneseCourses([response]);
  };


  // const filteredCourses = japaneseCourses.filter((course) => {
  //   const matchesSearch =
  //     course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     course.description.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesCategory = selectedCategory === "Tất cả" || course.topic === selectedCategory;
  //   const matchesLevel = selectedLevel === "Tất cả" || course.level === selectedLevel;

  //   return matchesSearch && matchesCategory && matchesLevel;
  // });

  // if (!course) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="text-6xl mb-4">🇯🇵</div>
  //         <p className="text-gray-600">Đang tải thông tin khóa học...</p>
  //       </div>
  //     </div>
  //   )
  // }

  const totalLessons = curriculum.reduce((total, chapter) => total + chapter.lessons.length, 0)
  const completedLessons = curriculum.reduce(
    (total, chapter) => total + chapter.lessons.filter((lesson) => lesson.isCompleted).length,
    0,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách khóa học
          </Button>
        </div>
      </div>
      {japaneseCourses.map((course) => (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}

            <div className="lg:col-span-2 space-y-6">
              {/* Course Header */}
              <Card className="border-red-100">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.isHot && <Badge className="bg-red-500">🔥 HOT</Badge>}
                    {course.isBestseller && <Badge className="bg-yellow-500">⭐ Bestseller</Badge>}
                    <Badge className="bg-red-600 text-white">JLPT {course.level}</Badge>
                    <Badge variant="secondary">{course.category}</Badge>
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-4">{course.title}</CardTitle>
                  <p className="text-gray-600 text-lg mb-6">{course.description}</p>

                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      {/* <span className="text-gray-500">({course.students.toLocaleString()} học viên)</span> */}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{course.estimatedDuration}</span>
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

                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
                    <span>👨‍🏫 Giảng viên:</span>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                </CardHeader>
              </Card>

              {/* Course Content Tabs */}
              <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="curriculum">Nội dung khóa học</TabsTrigger>
                  <TabsTrigger value="instructor">Giảng viên</TabsTrigger>
                  <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                </TabsList>

                <TabsContent value="curriculum" className="space-y-4">
                  <Card className="border-red-100">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-red-600" />
                        Chương trình học
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{curriculum.length} chương</span>
                        <span>{totalLessons} bài học</span>
                        <span>Tiến độ: {Math.round((completedLessons / totalLessons) * 100)}%</span>
                      </div>
                      <Progress value={(completedLessons / totalLessons) * 100} className="w-full" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {curriculum.map((chapter) => (
                        <div key={chapter.id} className="border rounded-lg p-4">
                          <h3 className="font-semibold text-lg mb-3 text-gray-900">{chapter.title}</h3>
                          <div className="space-y-2">
                            {chapter.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.isCompleted ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <Play className="h-5 w-5 text-gray-400" />
                                  )}
                                  <span className="font-medium">{lesson.title}</span>
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="instructor">
                  <Card className="border-red-100">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-red-600" />
                        Thông tin giảng viên
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-4">
                        <img
                          src="/placeholder.svg?height=80&width=80"
                          alt={course.instructor}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{course.instructor}</h3>
                          <p className="text-gray-600 mb-4">
                            Giảng viên tiếng Nhật bản ngữ với hơn 10 năm kinh nghiệm giảng dạy. Tốt nghiệp Đại học Tokyo,
                            chuyên ngành Ngôn ngữ học Nhật Bản.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Kinh nghiệm:</span>
                              <span className="text-gray-600 ml-2">10+ năm</span>
                            </div>
                            <div>
                              <span className="font-medium">Học viên:</span>
                              <span className="text-gray-600 ml-2">5,000+</span>
                            </div>
                            <div>
                              <span className="font-medium">Chứng chỉ:</span>
                              <span className="text-gray-600 ml-2">JLPT N1</span>
                            </div>
                            <div>
                              <span className="font-medium">Đánh giá:</span>
                              <span className="text-gray-600 ml-2">4.9/5 ⭐</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews">
                  <Card className="border-red-100">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-red-600" />
                        Đánh giá từ học viên
                      </CardTitle>
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold">{course.rating}</div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= course.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          {/* <p className="text-sm text-gray-600">{course.students.toLocaleString()} đánh giá</p> */}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-start gap-3">
                            <img
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{review.name}</span>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-3 w-3 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              {/* Course Preview */}
              <Card className="border-red-100 sticky top-4">
                <CardHeader className="p-0">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-red-600">{course.price}₫</span>
                        <span className="text-lg text-gray-500 line-through ml-2">{course.originalPrice}₫</span>
                      </div>
                      {/* <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                      </Button> */}
                    </div>

                    <div className="space-y-3">
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3"
                      // onClick={handleViewSlots}
                      >
                        Xem lịch học
                      </Button>
                      <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                        Học thử miễn phí
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:text-gray-700">
                        <Share2 className="h-4 w-4 mr-2" />
                        Chia sẻ
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 text-gray-600 hover:text-gray-700">
                        <Download className="h-4 w-4 mr-2" />
                        Tải về
                      </Button>
                    </div>

                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thời lượng:</span>
                        <span className="font-medium">{course.estimatedDuration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số bài học:</span>
                        <span className="font-medium">{totalLessons} bài</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cấp độ:</span>
                        <span className="font-medium">JLPT {course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chứng chỉ:</span>
                        <span className="font-medium">Có</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Truy cập:</span>
                        <span className="font-medium">Trọn đời</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What you'll learn */}
              <Card className="border-red-100">
                <CardHeader>
                  <CardTitle className="text-lg">Bạn sẽ học được gì?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Nắm vững hệ thống chữ viết Hiragana và Katakana</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Học {course.vocabulary} từ vựng cơ bản</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Hiểu và sử dụng {course.grammar}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Giao tiếp cơ bản trong cuộc sống hàng ngày</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Chuẩn bị tốt cho kỳ thi JLPT {course.level}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
