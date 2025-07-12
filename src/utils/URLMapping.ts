const API_URL =
 (import.meta.env.VITE_API_URL as string) || "http://localhost:8080/api";

 const API_URL_AI= "http://localhost:8090";

const URLMapping = {
  // User APIs
  LOGIN: "users/login",
  REGISTER: "users/register",
  VEFIRY: "users/verify",
  OAUTH_GOOGLE: `${API_URL}/auth/google`,
  FORGOT_PASSWORD: "users/forgot-password",
  RESET_PASSWORD: "users/reset-password",

  // Subject APIs
  LIST_COURSE: "/courses",
  COURSE_DETAIL: "/courses",
  COURSE_CREATE: "/courses/create",
  UNIT_SKILL: "/units/detail",
  MATERIAL: "/materials/unit",

  // Chapter APIs
  CHAPTER_CREATE:"/chapters/create",

  // Unit APIs
  UNIT_CREATE: "/units/create",

  // Material APIs
  MATERIAL_CREATE:"/materials/create",
};

export default URLMapping;

export { API_URL };
export {API_URL_AI};