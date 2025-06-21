"use client"

import { useState } from "react"
import { Form, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/courses", label: "Giới thiệu" },
    { href: "/courselist", label: "Khóa Học" },
    { href: "/dictionary", label: "Cộng Đồng" },
    { href: "/chatbot", label: "Học với AI" },
    { href: "/about", label: "Sách" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold">
            <span className="text-red-600">日本語</span>
            <span className="text-gray-900">Learning</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="text-sm font-medium transition-colors hover:text-red-600">
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <a href="/login">
            <Button  variant="ghost" size="sm">
              Đăng Nhập
            </Button>
          </a>
          <a href="/register"><Button size="sm" className="bg-red-600 hover:bg-red-700">
            Đăng Ký
          </Button></a>
          
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block text-sm font-medium transition-colors hover:text-red-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <a href="/login">
                <Button variant="ghost" size="sm" className="w-full">
                  Đăng Nhập
                </Button>
              </a>
              <a href="/register"><Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                Đăng Ký
              </Button></a>
              
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
