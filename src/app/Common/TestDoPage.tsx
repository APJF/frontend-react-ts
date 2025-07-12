"use client"

import QuizInterface from "@/components/sections/common/quiz-interface"
import { Header } from "@/components/layout/header"
import { useNavigate, useParams } from "react-router-dom"

export default function TestDoPage() {
  const navigate = useNavigate()
  const { quizId } = useParams()

  // TODO: fetch questions by quizId
  const handleQuizSubmit = (answers: Record<number, number>) => {
    // TODO: submit answers and get attemptId
    const attemptId = "123" // fake
    navigate(`/test/result/${attemptId}`)
  }

  return (
    <>
      <Header />
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
