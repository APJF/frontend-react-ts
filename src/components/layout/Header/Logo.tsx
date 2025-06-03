"use client"

import type React from "react"

import Link from "next/link"

export const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold">
        J
      </div>
      <span className="text-xl font-bold text-emerald-800">JapanLearn</span>
    </Link>
  )
}
