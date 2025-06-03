"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { NAVIGATION_ITEMS } from "@/constants/navigation"
import { Logo } from "./Logo"
import { UserActions } from "./UserActions"
import { MobileMenu } from "./MobileMenu"
import type { HeaderProps } from "@/types/components"

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isVip, logout } = useAuth()
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-emerald-50/95 backdrop-blur supports-[backdrop-filter]:bg-emerald-50/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/about" className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors">
            Giới thiệu
          </a>

          {/* Khóa học Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCoursesOpen(true)}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <button className="text-emerald-700 hover:text-emerald-900 font-medium bg-transparent hover:bg-emerald-100 px-4 py-2 rounded-md transition-colors">
              Khóa học
            </button>
            {isCoursesOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-50">
                <div className="grid w-48 gap-2 p-4">
                  {NAVIGATION_ITEMS.find((item) => item.id === "courses")?.children?.map((course: { id: React.Key | null | undefined; href: string | undefined; label: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => (
                    <a
                      key={course.id}
                      href={course.href}
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-emerald-50 transition-colors"
                    >
                      🎓<span className="text-sm font-medium">{course.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="/community" className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors">
            Cộng đồng
          </a>

          <a href="/books" className="text-emerald-700 hover:text-emerald-900 font-medium transition-colors">
            Sách
          </a>
        </nav>

        <UserActions user={user} isVip={isVip} onLogout={logout} />

        <MobileMenu isOpen={isMenuOpen} onToggle={setIsMenuOpen} items={NAVIGATION_ITEMS} />
      </div>
    </header>
  )
}
