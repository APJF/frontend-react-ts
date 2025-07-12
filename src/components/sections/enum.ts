// src/enums/enum.ts

export enum Level {
  N5 = 'N5',
  N4 = 'N4',
  N3 = 'N3',
  N2 = 'N2',
  N1 = 'N1',
}

export enum Status {
  DRAFT = 'DRAFT',       // đang biên soạn
  PENDING = 'PENDING',   // staff gửi duyệt
  PUBLISHED = 'PUBLISHED', // manager duyệt
  REJECTED = 'REJECTED', // manager từ chối
  ARCHIVED = 'ARCHIVED', // ngưng sử dụng
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  FILL_BLANK = 'FILL_BLANK',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export enum ExamScopeType {
  GLOBAL = 'GLOBAL',
  SCHOOL = 'SCHOOL',
  CLASS = 'CLASS',
}

export enum ExamStatus {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}
