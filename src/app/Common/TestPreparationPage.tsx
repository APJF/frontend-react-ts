"use client"

import QuizPreparation from "@/components/sections/common/quiz-preparation"
import { Header } from "@/components/layout/header"
import { useNavigate, useParams } from "react-router-dom"

export default function TestPreparationPage() {
  const navigate = useNavigate()
  const { quizId } = useParams()

  // TODO: fetch quiz info by quizId
  const handleStart = () => {
    navigate(`/test/do/${quizId}`)
  }

  return (
    <>
      <Header />
      <QuizPreparation
        title="Bài kiểm tra Tiếng Nhật N5"
        description="Kiểm tra kiến thức Hiragana, Katakana và từ vựng cơ bản"
        timeLimit={30}
        questionCount={5}
        difficulty="Trung bình"
        instructions={[
          "Đọc kỹ từng câu hỏi trước khi chọn đáp án",
          "Mỗi câu hỏi chỉ có một đáp án đúng",
          "Bạn có thể quay lại các câu hỏi đã làm để kiểm tra",
          "Sử dụng nút đánh dấu để ghi nhớ câu hỏi cần xem lại",
          "Bài thi sẽ tự động nộp khi hết thời gian",
        ]}
        onStart={handleStart}
      />
    </>
  )
}
