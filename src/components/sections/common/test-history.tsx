"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import ReactPaginate from "react-paginate"
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Eye,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  Trophy,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

interface TestResult {
  id: number
  testName: string
  testType: "N5" | "N4" | "N3" | "N2" | "N1"
  score: number
  totalQuestions: number
  percentage: number
  timeSpent: string
  completedAt: string
  difficulty: "Dễ" | "Trung bình" | "Khó"
  skills: {
    kanji: { correct: number; total: number }
    vocabulary: { correct: number; total: number }
    grammar: { correct: number; total: number }
    reading: { correct: number; total: number }
    listening: { correct: number; total: number }
  }
}

const sampleTestResults: TestResult[] = [
  {
    id: 1,
    testName: "Bài kiểm tra Tiếng Nhật N5 - Tổng hợp",
    testType: "N5",
    score: 18,
    totalQuestions: 20,
    percentage: 90,
    timeSpent: "25:30",
    completedAt: "2024-03-20T14:30:00Z",
    difficulty: "Trung bình",
    skills: {
      kanji: { correct: 4, total: 5 },
      vocabulary: { correct: 4, total: 4 },
      grammar: { correct: 3, total: 4 },
      reading: { correct: 4, total: 4 },
      listening: { correct: 3, total: 3 },
    },
  },
  {
    id: 2,
    testName: "Kiểm tra Hiragana và Katakana",
    testType: "N5",
    score: 12,
    totalQuestions: 15,
    percentage: 80,
    timeSpent: "18:45",
    completedAt: "2024-03-19T10:15:00Z",
    difficulty: "Dễ",
    skills: {
      kanji: { correct: 8, total: 10 },
      vocabulary: { correct: 4, total: 5 },
      grammar: { correct: 0, total: 0 },
      reading: { correct: 0, total: 0 },
      listening: { correct: 0, total: 0 },
    },
  },
  {
    id: 3,
    testName: "Bài kiểm tra N4 - Ngữ pháp cơ bản",
    testType: "N4",
    score: 14,
    totalQuestions: 25,
    percentage: 56,
    timeSpent: "35:20",
    completedAt: "2024-03-18T16:45:00Z",
    difficulty: "Khó",
    skills: {
      kanji: { correct: 2, total: 5 },
      vocabulary: { correct: 3, total: 5 },
      grammar: { correct: 6, total: 10 },
      reading: { correct: 2, total: 3 },
      listening: { correct: 1, total: 2 },
    },
  },
  {
    id: 4,
    testName: "Luyện tập từ vựng N5",
    testType: "N5",
    score: 22,
    totalQuestions: 30,
    percentage: 73,
    timeSpent: "22:10",
    completedAt: "2024-03-17T09:30:00Z",
    difficulty: "Trung bình",
    skills: {
      kanji: { correct: 5, total: 8 },
      vocabulary: { correct: 17, total: 22 },
      grammar: { correct: 0, total: 0 },
      reading: { correct: 0, total: 0 },
      listening: { correct: 0, total: 0 },
    },
  },
  {
    id: 5,
    testName: "Bài kiểm tra N3 - Đọc hiểu",
    testType: "N3",
    score: 8,
    totalQuestions: 12,
    percentage: 67,
    timeSpent: "40:15",
    completedAt: "2024-03-16T13:20:00Z",
    difficulty: "Khó",
    skills: {
      kanji: { correct: 2, total: 3 },
      vocabulary: { correct: 1, total: 2 },
      grammar: { correct: 2, total: 3 },
      reading: { correct: 3, total: 4 },
      listening: { correct: 0, total: 0 },
    },
  },
  {
    id: 6,
    testName: "Kiểm tra nghe N4",
    testType: "N4",
    score: 15,
    totalQuestions: 18,
    percentage: 83,
    timeSpent: "28:40",
    completedAt: "2024-03-15T11:10:00Z",
    difficulty: "Trung bình",
    skills: {
      kanji: { correct: 0, total: 0 },
      vocabulary: { correct: 3, total: 4 },
      grammar: { correct: 2, total: 3 },
      reading: { correct: 0, total: 0 },
      listening: { correct: 10, total: 11 },
    },
  },
  {
    id: 7,
    testName: "Bài kiểm tra N5 - Kanji cơ bản",
    testType: "N5",
    score: 16,
    totalQuestions: 20,
    percentage: 80,
    timeSpent: "15:25",
    completedAt: "2024-03-14T15:45:00Z",
    difficulty: "Dễ",
    skills: {
      kanji: { correct: 16, total: 20 },
      vocabulary: { correct: 0, total: 0 },
      grammar: { correct: 0, total: 0 },
      reading: { correct: 0, total: 0 },
      listening: { correct: 0, total: 0 },
    },
  },
  {
    id: 8,
    testName: "Tổng hợp N4 - Phần 1",
    testType: "N4",
    score: 28,
    totalQuestions: 40,
    percentage: 70,
    timeSpent: "45:30",
    completedAt: "2024-03-13T14:20:00Z",
    difficulty: "Khó",
    skills: {
      kanji: { correct: 6, total: 8 },
      vocabulary: { correct: 8, total: 12 },
      grammar: { correct: 7, total: 10 },
      reading: { correct: 4, total: 6 },
      listening: { correct: 3, total: 4 },
    },
  },
]

interface TestHistoryProps {
  onViewDetails?: (testId: number) => void
  onRetakeTest?: (testId: number) => void
}

export default function TestHistory({ onViewDetails, onRetakeTest }: TestHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [testTypeFilter, setTestTypeFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [sortByDate, setSortByDate] = useState("newest")
  const [sortByScore, setSortByScore] = useState("highest")
  const [sortPriority, setSortPriority] = useState<"date" | "score">("date")
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6

  // Filter and sort tests
  const filteredAndSortedTests = useMemo(() => {
    const filtered = sampleTestResults.filter((test) => {
      const matchesSearch = test.testName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = testTypeFilter === "all" || test.testType === testTypeFilter
      const matchesDifficulty = difficultyFilter === "all" || test.difficulty === difficultyFilter

      return matchesSearch && matchesType && matchesDifficulty
    })

    // Sort
    filtered.sort((a, b) => {
      if (sortPriority === "date") {
        const dateComparison =
          sortByDate === "newest"
            ? new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
            : new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
        // If dates are equal, sort by score as secondary
        if (dateComparison === 0) {
          return sortByScore === "highest" ? b.percentage - a.percentage : a.percentage - b.percentage
        }
        return dateComparison
      } else {
        const scoreComparison =
          sortByScore === "highest" ? b.percentage - a.percentage : a.percentage - b.percentage
        // If scores are equal, sort by date as secondary
        if (scoreComparison === 0) {
          return sortByDate === "newest"
            ? new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
            : new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
        }
        return scoreComparison
      }
    })

    return filtered
  }, [searchTerm, testTypeFilter, difficultyFilter, sortByDate, sortByScore, sortPriority])

  // Reset currentPage when filters change
  useEffect(() => {
    setCurrentPage(0)
  }, [filteredAndSortedTests])

  // Pagination
  const pageCount = Math.ceil(filteredAndSortedTests.length / itemsPerPage)
  const offset = currentPage * itemsPerPage
  const currentTests = filteredAndSortedTests.slice(offset, offset + itemsPerPage)

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected)
  }

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <Trophy className="h-3 w-3 mr-1" />
          Xuất sắc
        </Badge>
      )
    } else if (percentage >= 80) {
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <Star className="h-3 w-3 mr-1" />
          Tốt
        </Badge>
      )
    } else if (percentage >= 70) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Đạt
        </Badge>
      )
    } else if (percentage >= 50) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Trung bình
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Cần cải thiện
        </Badge>
      )
    }
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      Dễ: "bg-green-100 text-green-800",
      "Trung bình": "bg-yellow-100 text-yellow-800",
      Khó: "bg-red-100 text-red-800",
    }
    return <Badge className={colors[difficulty as keyof typeof colors]}>{difficulty}</Badge>
  }

  const getTestTypeBadge = (type: string) => {
    return <Badge variant="outline">{type}</Badge>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const calculateStats = (filteredTests: TestResult[]) => {
    const totalTests = filteredTests.length
    const averageScore = totalTests
      ? Math.round(filteredTests.reduce((sum, test) => sum + test.percentage, 0) / totalTests)
      : 0
    const bestScore = totalTests
      ? Math.max(...filteredTests.map((test) => test.percentage))
      : 0
    const recentTests = sampleTestResults.filter(
      (test) => new Date(test.completedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ).length

    return { totalTests, averageScore, bestScore, recentTests }
  }

  const stats = calculateStats(filteredAndSortedTests)

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Lịch sử bài kiểm tra</h1>
          <p className="text-gray-600">Xem lại tất cả các bài kiểm tra đã hoàn thành</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng bài thi</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalTests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.averageScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Điểm cao nhất</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.bestScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tuần này</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.recentTests}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm bài thi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={testTypeFilter} onValueChange={setTestTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trình độ" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Tất cả trình độ</SelectItem>
                  <SelectItem value="N5">N5</SelectItem>
                  <SelectItem value="N4">N4</SelectItem>
                  <SelectItem value="N3">N3</SelectItem>
                  <SelectItem value="N2">N2</SelectItem>
                  <SelectItem value="N1">N1</SelectItem>
                </SelectContent>
              </Select>

              {/* <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả độ khó" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">Tất cả độ khó</SelectItem>
                  <SelectItem value="Dễ">Dễ</SelectItem>
                  <SelectItem value="Trung bình">Trung bình</SelectItem>
                  <SelectItem value="Khó">Khó</SelectItem>
                </SelectContent>
              </Select> */}

              <Select value={sortByDate} onValueChange={(value) => {
                setSortByDate(value)
                setSortPriority("date")
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Sắp xếp theo ngày" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortByScore} onValueChange={(value) => {
                setSortByScore(value)
                setSortPriority("score")
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Sắp xếp theo điểm" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="highest">Điểm cao nhất</SelectItem>
                  <SelectItem value="lowest">Điểm thấp nhất</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-gray-600 flex items-center">
                Tìm thấy {filteredAndSortedTests.length} bài thi
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentTests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{test.testName}</h3>
                    <div className="flex items-center space-x-2">
                      {getTestTypeBadge(test.testType)}
                      {/* {getDifficultyBadge(test.difficulty)} */}
                      {getPerformanceBadge(test.percentage)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{test.percentage}%</div>
                    <div className="text-sm text-gray-600">
                      {test.score}/{test.totalQuestions}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Test Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Thời gian: {test.timeSpent}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{formatDate(test.completedAt)}</span>
                  </div>
                </div>

                {/* Skills Breakdown */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Phân tích kỹ năng:</h4>
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    {Object.entries(test.skills).map(([skill, data]) => {
                      if (data.total === 0) return null
                      const percentage = Math.round((data.correct / data.total) * 100)
                      const skillNames = {
                        kanji: "Kanji",
                        vocabulary: "Từ vựng",
                        grammar: "Ngữ pháp",
                        reading: "Đọc",
                        listening: "Nghe",
                      }

                      return (
                        <div key={skill} className="text-center">
                          <div className="text-gray-600">{skillNames[skill as keyof typeof skillNames]}</div>
                          <div className="font-medium">{percentage}%</div>
                          <div className="text-gray-500">
                            {data.correct}/{data.total}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails?.(test.id)}
                    className="flex-1 flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Xem chi tiết</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRetakeTest?.(test.id)}
                    className="flex-1 flex items-center space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Làm lại</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center">
            <ReactPaginate
              breakLabel="..."
              nextLabel={<span className="flex items-center">Sau <ChevronRight className="h-4 w-4 ml-1" /></span>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<span className="flex items-center"><ChevronLeft className="h-4 w-4 mr-1" />Trước</span>}
              renderOnZeroPageCount={null}
              containerClassName="flex items-center space-x-2"
              pageClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 rounded-md cursor-pointer"
              activeClassName="px-3 py-2 text-sm font-medium text-white bg-blue-600 border-2 border-blue-700 rounded-md z-10 shadow-sm"
              previousClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 rounded-md cursor-pointer"
              nextClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 rounded-md cursor-pointer"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakClassName="px-3 py-2 text-sm font-medium text-gray-500"
            />
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedTests.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài kiểm tra</h3>
              <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}