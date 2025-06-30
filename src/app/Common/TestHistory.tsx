"use client"

import TestHistory from "@/components/sections/common/test-history"

export default function TestHistoryPage() {
  const handleViewDetails = (testId: number) => {
    console.log("View test details:", testId)
    // Navigate to test details page
  }

  const handleRetakeTest = (testId: number) => {
    console.log("Retake test:", testId)
    // Navigate to quiz interface with same test
  }

  return <TestHistory onViewDetails={handleViewDetails} onRetakeTest={handleRetakeTest} />
}
