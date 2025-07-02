const API_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:8080/api/users";
const AI_API_URL = "http://localhost:8085"; // 👉 Thêm URL của hệ thống AI

const URLMapping = {
  // User APIs
  LOGIN: "/login",
  REGISTER: "/register",
  VEFIRY: "/active-account",
  OAUTH_GOOGLE: `${API_URL}/auth/google`,
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // Subject APIs
  LIST_SUBJECT: "/subjects/list",
  SUBJECT_DETAIL: "/subjects/detail",
  SUBJECT_CREATE: "/subjects/create",
  SLOT_SKILL: "/slots/detail",
  MATERIAL: "/materials/slot",

  // 👉 AI APIs (cổng 8085)
  AI_CHAT_INVOKE: `${AI_API_URL}/chat/invoke`,
  AI_SESSION_CREATE: `${AI_API_URL}/sessions`,
  AI_SESSION_BY_USER: (userId: string) => `${AI_API_URL}/sessions/user/${userId}`,
  AI_SESSION_DELETE: (sessionId: string) => `${AI_API_URL}/sessions/${sessionId}`,
};

export default URLMapping;

export { API_URL };