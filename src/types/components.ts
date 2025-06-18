import type { User } from "./auth"

export interface HeaderProps {
  className?: string
}

export interface NavigationItem {
  id: string
  label: string
  href: string
  children?: NavigationItem[]
}

export interface UserActionsProps {
  user: User | null
  isVip: boolean
  onLogout: () => void
}

export interface MobileMenuProps {
  isOpen: boolean
  onToggle: (isOpen: boolean) => void
  items: NavigationItem[]
}

export interface Course {
  id: string
  title: string
  description: string
  imageUrl: string
  price: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  videoUrl: string
  duration: number
}

export interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
}

export interface LessonItemProps {
  lesson: Lesson
  onPlay?: (lessonId: string) => void
}
