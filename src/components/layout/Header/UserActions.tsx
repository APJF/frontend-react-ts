"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { UserActionsProps } from "@/types/components"

export const UserActions: React.FC<UserActionsProps> = ({ user, isVip, onLogout }) => {
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" asChild>
          <a href="/login">Đăng nhập</a>
        </Button>
        <Button asChild>
          <a href="/register">Đăng ký</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      {/* VIP/Regular Badge */}
      <Button
        variant="ghost"
        size="sm"
        className={`${
          isVip
            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600"
            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
        } transition-all duration-200`}
      >
        {isVip ? <>👑 VIP</> : <>👤 Thường</>}
      </Button>

      {/* My Courses */}
      <Button
        variant="ghost"
        size="icon"
        className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100"
        asChild
      >
        <a href="/my-courses">
          📚<span className="sr-only">Khóa học của tôi</span>
        </a>
      </Button>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 relative"
        asChild
      >
        <a href="/notifications">
          🔔
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 hover:bg-red-500">
            3
          </Badge>
          <span className="sr-only">Thông báo</span>
        </a>
      </Button>

      {/* User Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center space-x-2 p-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a href="/profile">👤 Thông tin cá nhân</a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href="/settings">⚙️ Cài đặt</a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout} className="text-red-600">
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
