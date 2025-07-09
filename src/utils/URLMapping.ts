const API_URL =
 (import.meta.env.VITE_API_URL as string) || "http://localhost:8080";

const URLMapping = {
  // User APIs
  LOGIN: "users/login",
  REGISTER: "users/register",
  VEFIRY: "users/verify",
  OAUTH_GOOGLE: `${API_URL}/auth/google`,
  FORGOT_PASSWORD: "users/forgot-password",
  RESET_PASSWORD: "users/reset-password",

  // Subject APIs
  LIST_SUBJECT: "/subjects/list",
  SUBJECT_DETAIL: "/subjects/detail",
  SUBJECT_CREATE: "/subjects/create",
  SLOT_SKILL: "/slots/detail",
  MATERIAL: "/materials/slot",

  // Chapter APIs
  CHAPTER_CREATE:"/chapters/create",

  // Unit APIs
  UNIT_CREATE: "/slots/create",

  // Material APIs
  MATERIAL_CREATE:"/materials/create",

  // 👉 AI APIs (cổng 8085)
  AI_CHAT_INVOKE: `/chat/invoke`,
  AI_SESSION_CREATE: `/sessions`,
  AI_SESSION_BY_USER: (userId: string) => `/sessions/user/${userId}`,
  AI_SESSION_DELETE: (sessionId: string) => `/sessions/${sessionId}`,
};

export default URLMapping;

export { API_URL };