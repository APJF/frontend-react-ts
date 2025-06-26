// app/types/request.ts
export interface RequestAllInfo {
  id: number;
  type: "Subject" | "Chapter" | "Unit";
  action: "Add" | "Update" | "Delete";
  title: string;
  creator: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  updatedAt: string;
  level?: "N5" | "N4" | "N3" | "N2" | "N1";
  topic?: string;
  description?: string;
  estimatedDuration?: number;
  image?: string;
  orderNumber?: number;
  subjectId?: string;
  subjectName?: string;
  chapterId?: string;
  chapterName?: string;
  skill?: "Kanji" | "Từ vựng" | "Ngữ pháp" | "Đọc hiểu" | "Nghe";
}

export interface PaginatedResponse {
  items: Request[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}