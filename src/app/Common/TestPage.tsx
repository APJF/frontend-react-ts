"use client"

import QuizInterface from "@/components/sections/common/quiz-interface"
import { Header } from "@/components/layout/header"

export default function QuizPage() {
  const handleQuizSubmit = (answers: Record<number, number>) => {
    console.log("Quiz submitted with answers:", answers)
    // Handle quiz submission logic here
  }

  return (
    <>
    <Header/>
    <QuizInterface
      title="Bài kiểm tra Tiếng Nhật N5"
      description="Kiểm tra kiến thức Hiragana, Katakana và từ vựng cơ bản"
      timeLimit={30}
      difficulty="Trung bình"
      onSubmit={handleQuizSubmit}
    />
    </>
    
  )
}
