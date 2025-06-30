// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/router"
// import QuizAnswerReview from "@/components/sections/common/quiz-answer-review"

// interface QuizQuestion {
//   id: number
//   type: "text" | "image" | "audio" | "pdf"
//   skill: "kanji" | "vocabulary" | "grammar" | "reading" | "listening"
//   question: string
//   content?: {
//     imageUrl?: string
//     audioUrl?: string
//     pdfUrl?: string
//     text?: string
//   }
//   options: string[]
//   correctAnswer: number
//   explanation?: string
// }

// export default function AnswerReviewPage() {
//   const [questions, setQuestions] = useState<QuizQuestion[]>([])
//   const [answers, setAnswers] = useState<Record<number, number>>({})
//   const router = useRouter()
//   const { testId } = router.query

//   useEffect(() => {
//     // Khi có API, lấy dữ liệu dựa trên testId
//     if (testId) {
//       console.log(`Lấy dữ liệu cho testId: ${testId}`)
//       // Ví dụ: fetch(`/api/quiz/${testId}`)
//     }
//     // Dùng localStorage tạm thời
//     const storedQuestions = localStorage.getItem("quizQuestions")
//     const storedAnswers = localStorage.getItem("quizAnswers")
//     if (storedQuestions) {
//       setQuestions(JSON.parse(storedQuestions))
//     }
//     if (storedAnswers) {
//       setAnswers(JSON.parse(storedAnswers))
//     }
//   }, [testId])

//   const handleBack = () => {
//     localStorage.removeItem("quizQuestions")
//     localStorage.removeItem("quizAnswers")
//     router.push("/quiz/history")
//   }

//   return <QuizAnswerReview questions={questions} answers={answers} onBack={handleBack} />
// }