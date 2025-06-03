export interface Course {
  id: string
  title: string
  description: string
  level: "N5" | "N4" | "N3" | "N2" | "N1"
  duration: number
  price: number
  thumbnail: string
  instructor: {
    id: string
    name: string
    avatar: string
  }
  lessons: Lesson[]
  enrolled: boolean
  progress?: number
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  id: string
  title: string
  duration: number
  videoUrl: string
  materials: Material[]
  completed?: boolean
}

export interface Material {
  id: string
  title: string
  type: "pdf" | "video" | "audio" | "text"
  url: string
}

export interface CourseFilters {
  level?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: "price" | "popularity" | "newest"
  sortOrder?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
