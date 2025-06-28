"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Volume2, BookOpen, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VocabularyItem {
  id: string
  kanji: string
  hiragana: string
  romaji: string
  meaning: string
  category: string
  level: "N5" | "N4" | "N3" | "N2" | "N1"
}

const vocabularyData: VocabularyItem[] = [
  {
    id: "1",
    kanji: "家族",
    hiragana: "かぞく",
    romaji: "kazoku",
    meaning: "gia đình",
    category: "Gia đình",
    level: "N5",
  },
  {
    id: "2",
    kanji: "学校",
    hiragana: "がっこう",
    romaji: "gakkou",
    meaning: "trường học",
    category: "Giáo dục",
    level: "N5",
  },
  {
    id: "3",
    kanji: "仕事",
    hiragana: "しごと",
    romaji: "shigoto",
    meaning: "công việc",
    category: "Nghề nghiệp",
    level: "N5",
  },
  {
    id: "4",
    kanji: "友達",
    hiragana: "ともだち",
    romaji: "tomodachi",
    meaning: "bạn bè",
    category: "Quan hệ",
    level: "N5",
  },
  {
    id: "5",
    kanji: "料理",
    hiragana: "りょうり",
    romaji: "ryouri",
    meaning: "nấu ăn, món ăn",
    category: "Ẩm thực",
    level: "N4",
  },
  {
    id: "6",
    kanji: "天気",
    hiragana: "てんき",
    romaji: "tenki",
    meaning: "thời tiết",
    category: "Thiên nhiên",
    level: "N5",
  },
  {
    id: "7",
    kanji: "電話",
    hiragana: "でんわ",
    romaji: "denwa",
    meaning: "điện thoại",
    category: "Công nghệ",
    level: "N5",
  },
  {
    id: "8",
    kanji: "買い物",
    hiragana: "かいもの",
    romaji: "kaimono",
    meaning: "mua sắm",
    category: "Mua sắm",
    level: "N5",
  },
  {
    id: "9",
    kanji: "時間",
    hiragana: "じかん",
    romaji: "jikan",
    meaning: "thời gian",
    category: "Thời gian",
    level: "N5",
  },
  {
    id: "10",
    kanji: "お金",
    hiragana: "おかね",
    romaji: "okane",
    meaning: "tiền",
    category: "Tài chính",
    level: "N5",
  },
  {
    id: "11",
    kanji: "病院",
    hiragana: "びょういん",
    romaji: "byouin",
    meaning: "bệnh viện",
    category: "Y tế",
    level: "N5",
  },
  {
    id: "12",
    kanji: "駅",
    hiragana: "えき",
    romaji: "eki",
    meaning: "ga tàu",
    category: "Giao thông",
    level: "N5",
  },
  {
    id: "13",
    kanji: "映画",
    hiragana: "えいが",
    romaji: "eiga",
    meaning: "phim",
    category: "Giải trí",
    level: "N5",
  },
  {
    id: "14",
    kanji: "音楽",
    hiragana: "おんがく",
    romaji: "ongaku",
    meaning: "âm nhạc",
    category: "Giải trí",
    level: "N5",
  },
  {
    id: "15",
    kanji: "写真",
    hiragana: "しゃしん",
    romaji: "shashin",
    meaning: "ảnh",
    category: "Nghệ thuật",
    level: "N5",
  },
  {
    id: "16",
    kanji: "本",
    hiragana: "ほん",
    romaji: "hon",
    meaning: "sách",
    category: "Giáo dục",
    level: "N5",
  },
  {
    id: "17",
    kanji: "新聞",
    hiragana: "しんぶん",
    romaji: "shinbun",
    meaning: "báo",
    category: "Truyền thông",
    level: "N5",
  },
  {
    id: "18",
    kanji: "手紙",
    hiragana: "てがみ",
    romaji: "tegami",
    meaning: "thư",
    category: "Giao tiếp",
    level: "N5",
  },
  {
    id: "19",
    kanji: "部屋",
    hiragana: "へや",
    romaji: "heya",
    meaning: "phòng",
    category: "Nhà ở",
    level: "N5",
  },
  {
    id: "20",
    kanji: "台所",
    hiragana: "だいどころ",
    romaji: "daidokoro",
    meaning: "nhà bếp",
    category: "Nhà ở",
    level: "N5",
  },
]

const categories = [
  "Tất cả",
  "Gia đình",
  "Giáo dục",
  "Nghề nghiệp",
  "Quan hệ",
  "Ẩm thực",
  "Thiên nhiên",
  "Công nghệ",
  "Mua sắm",
  "Thời gian",
  "Tài chính",
  "Y tế",
  "Giao thông",
  "Giải trí",
  "Nghệ thuật",
  "Truyền thông",
  "Giao tiếp",
  "Nhà ở",
]

const levels = ["Tất cả", "N5", "N4", "N3", "N2", "N1"]

export default function Vocabulary() {
  const router = useNavigate()
  const [vocabulary] = useState<VocabularyItem[]>(vocabularyData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedLevel, setSelectedLevel] = useState("Tất cả")

  const filteredVocabulary = vocabulary.filter((item) => {
    const matchesSearch =
      item.kanji.includes(searchTerm) ||
      item.hiragana.includes(searchTerm) ||
      item.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "Tất cả" || item.category === selectedCategory
    const matchesLevel = selectedLevel === "Tất cả" || item.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const playAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "ja-JP"
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại kỹ năng
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-8 w-8 text-red-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Từ vựng tiếng Nhật</h1>
              <p className="text-gray-600">Học từ vựng với phát âm và nghĩa</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm từ vựng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-red-200 focus:border-red-400"
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 border-red-200">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-32 border-red-200">
                  <SelectValue placeholder="Cấp độ" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Vocabulary List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-sm text-gray-600">Hiển thị {filteredVocabulary.length} từ vựng</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVocabulary.map((item) => (
            <Card key={item.id} className="border-red-100 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-red-100 text-red-700">{item.level}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => playAudio(item.hiragana)}
                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-gray-900">{item.kanji}</div>
                  <div className="text-lg text-gray-600">{item.hiragana}</div>
                  <div className="text-sm text-gray-500">{item.romaji}</div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-center space-y-3">
                  <div className="text-lg font-medium text-red-600">{item.meaning}</div>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVocabulary.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy từ vựng nào</h3>
            <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  )
}
