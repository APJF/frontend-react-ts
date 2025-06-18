import { apiClient } from "@/lib/api"
import type { Course, CourseFilters, PaginatedResponse } from "@/types/courses"

class CoursesService {
  async getCourses(filters?: CourseFilters): Promise<PaginatedResponse<Course>> {
    const response = await apiClient.get("/courses", { params: filters })
    return response.data
  }

  async getCourseById(id: string): Promise<Course> {
    const response = await apiClient.get(`/courses/${id}`)
    return response.data
  }

  async enrollCourse(courseId: string): Promise<void> {
    await apiClient.post(`/courses/${courseId}/enroll`)
  }

  async getMyCourses(): Promise<Course[]> {
    const response = await apiClient.get("/courses/my-courses")
    return response.data
  }

  async getPopularCourses(): Promise<Course[]> {
    const response = await apiClient.get("/courses/popular")
    return response.data
  }

  async searchCourses(query: string): Promise<Course[]> {
    const response = await apiClient.get("/courses/search", { params: { q: query } })
    return response.data
  }
}

export const coursesService = new CoursesService()
