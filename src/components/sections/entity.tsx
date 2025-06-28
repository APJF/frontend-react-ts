export interface Chapter {
  id: number
  title: string
  description: string
  orderNumber: number
  subjectId: number
  createdAt: string
  updatedAt: string
  lessonCount: number
  duration: string
}

export interface Subject {
  id: number
  title: string
  topic: string
  description: string
  level: string
  estimatedDuration: string
  creatorId: string
  image: string
  createdAt: string
  updatedAt: string
  status: string
  orderNumber: number
  chapters: Chapter[]
  studentCount: number
  lessonCount: number
  rating: number
}

export interface Slot {
  id: number
  title: string
  description: string
  orderNumber: number
  chapterId: number
  createdAt: string
  updatedAt: string
}

export interface Material {
  id: number
  title: string
  description: string
  fileUrl: string
  imgUrl: string
  type: string
  status: string
  uploaderId: string
  subjectId: number
  createdAt: string
  updatedAt: string
  subject: Subject
}
