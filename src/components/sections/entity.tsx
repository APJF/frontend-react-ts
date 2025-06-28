export type MaterialType = {
  id: number
  name: string
}

export type Material = {
  id: number
  title: string
  description: string
  fileUrl: string
  uploaderId: number
  createdAt: string
  updatedAt: string
  type: MaterialType
}

export type Slot = {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  orderNumber: number
  materials: Material[]
}

export type Chapter = {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  orderNumber: number
  slots: Slot[]
  subjectId: number
}

export interface CreateChapterDTO {
  id?: number; // optional nếu là tạo mới
  title: string;
  description: string;
  orderNumber: number;
  subject: Subject; // chính là object có id
}


export type Subject = {
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
}
