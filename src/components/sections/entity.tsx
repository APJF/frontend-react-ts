export type MaterialType = {
  id: number
  name: string
}
export type user = {
  email: string
  avatar: string
}

export type Material = {
  id: number
  description: string
  fileUrl: string
  uploaderId: number
  createdAt: string
  updatedAt: string
  type: MaterialType
  unitId: number
}

export type Unit = {
  id: number
  title: string
  description: string
  prerequisite: number
  materials: Material[]
  chapterId: number
}

export type Chapter = {
  id: number
  title: string
  description: string
  prerequisite: number
  slots: Unit[]
  coursetId: number
}

export interface CreateChapterDTO {
  id?: number; // optional nếu là tạo mới
  title: string;
  description: string;
  orderNumber: number;
  course: Course; // chính là object có id
}


export type Course = {
  id: number
  title: string
  topic: string
  description: string
  level: string
  estimatedDuration: string
  creatorId: string
  image: string
  status: string
  prerequisite: number
  requirement:string
  chapters: Chapter[]
}
