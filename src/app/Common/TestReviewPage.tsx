"use client"

import QuizAnswerReview from "@/components/sections/common/quiz-answer-review"
import { Header } from "@/components/layout/header"
import { useNavigate, useParams } from "react-router-dom"

export default function TestReviewPage() {
  const navigate = useNavigate()
  const { attemptId } = useParams()

  // TODO: fetch review data by attemptId
  const handleBack = () => {
    navigate(`/test/result/${attemptId}`)
  }

  return (
    <>
      <Header />
      <QuizAnswerReview questions={[]} answers={{}} onBack={handleBack} />
    </>
  )
}
