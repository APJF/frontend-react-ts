// constants/navigation.ts - Navigation constants
import type { NavigationItem } from "@/components/layout/Header/Header"

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "about",
    label: "Giới thiệu",
    href: "/about",
  },
  {
    id: "courses",
    label: "Khóa học",
    href: "/courses",
    children: [
      { id: "n5", label: "Khóa N5", href: "/courses/n5" },
      { id: "n4", label: "Khóa N4", href: "/courses/n4" },
      { id: "n3", label: "Khóa N3", href: "/courses/n3" },
    ],
  },
  {
    id: "community",
    label: "Cộng đồng",
    href: "/community",
  },
  {
    id: "books",
    label: "Sách",
    href: "/books",
  },
]

export const USER_MENU_ITEMS = [
  { id: "profile", label: "Thông tin cá nhân", href: "/profile" },
  { id: "settings", label: "Cài đặt", href: "/settings" },
  { id: "my-courses", label: "Khóa học của tôi", href: "/my-courses" },
]
