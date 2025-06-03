"use client"

import type React from "react"

import { Separator } from "@/components/ui/separator"

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold">
                J
              </div>
              <span className="text-xl font-bold">JapanLearn</span>
            </div>
            <p className="text-emerald-200">Nền tảng học tiếng Nhật trực tuyến hàng đầu Việt Nam</p>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Khóa học</h3>
            <ul className="space-y-2 text-emerald-200">
              <li>
                <a href="/courses/n5" className="hover:text-white transition-colors">
                  Khóa N5
                </a>
              </li>
              <li>
                <a href="/courses/n4" className="hover:text-white transition-colors">
                  Khóa N4
                </a>
              </li>
              <li>
                <a href="/courses/n3" className="hover:text-white transition-colors">
                  Khóa N3
                </a>
              </li>
              <li>
                <a href="/courses/n2" className="hover:text-white transition-colors">
                  Khóa N2
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hỗ trợ</h3>
            <ul className="space-y-2 text-emerald-200">
              <li>
                <a href="/help" className="hover:text-white transition-colors">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <div className="space-y-2 text-emerald-200">
              <p>📧 support@japanlearn.vn</p>
              <p>📞 +84 123 456 789</p>
              <p>📍 Hà Nội, Việt Nam</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-emerald-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-200">© 2024 JapanLearn. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="text-emerald-200 hover:text-white transition-colors">
              Chính sách bảo mật
            </a>
            <a href="/terms" className="text-emerald-200 hover:text-white transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
