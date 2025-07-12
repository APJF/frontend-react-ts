"use client"

import QuizResults from "@/components/sections/common/quiz-results"
import { Header } from "@/components/layout/header"
import { useNavigate, useParams } from "react-router-dom"

export default function TestResultPage() {
  const navigate = useNavigate()
  const { attemptId } = useParams()

  // TODO: fetch result by attemptId
  const handleShowAnswers = () => {
    navigate(`/test/review/${attemptId}`)
  }
  const handleRestart = () => {
    navigate(`/test/preparation/1`)
  }

  return (
    <>
      <Header />
      <QuizResults
        score={4}
        totalQuestions={5}
        timeSpent="25:00"
        answers={{ 1: 0, 2: 1, 3: 0, 4: 2, 5: 0 }}
        questions={[]}
        onRestart={handleRestart}
        onShowAnswers={handleShowAnswers}
      />
    </>
  )
}
