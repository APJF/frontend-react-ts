import type {Status} from "@/components/sections/enum"

export interface Topic {
  id: string
  name: string
  description?: string
  // Add other topic properties as needed
}

export interface ApprovalRequest {
  id: string
  status: Status
  requestDate: string
  approvalDate?: string
  comments?: string
  // Add other approval request properties as needed
}

export interface Material {
  id: string
  description?: string
  fileUrl: string
  type: string
  unitId: string
  unit?: Unit
  approvalRequests?: ApprovalRequest[]
}

export interface Unit {
  id: string
  title: string
  description?: string
  status: Status
  prerequisiteUnitId?: string
  prerequisiteUnit?: Unit
  chapterId: string
  chapter?: Chapter
  materials?: Material[]
  approvalRequests?: ApprovalRequest[]
}

export interface Chapter {
  id: string
  title: string
  description?: string
  status: Status
  prerequisiteChapterId?: string
  prerequisiteChapter?: Chapter
  courseId: string
  course?: Course
  units?: Unit[]
  approvalRequests?: ApprovalRequest[]
}

export interface Course {
  id: string
  title: string
  description?: string
  duration: number
  level: string
  image?: string
  requirement?: string
  status: Status
  prerequisiteCourseId?: string
  prerequisiteCourse?: Course
  chapters?: Chapter[]
  topics?: Topic[]
  approvalRequests?: ApprovalRequest[]
}

