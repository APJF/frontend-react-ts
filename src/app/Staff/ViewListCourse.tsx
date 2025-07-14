import { useEffect, useState } from "react"
import { Course } from "@/components/sections/entity"
import { useNavigate } from "react-router-dom"
import AutoLayout from "@/components/layout/AutoLayout"
import { CourseListPage } from "@/components/sections/staff/course-list"
import { useAPI } from "@/hooks"
import URLMapping from "@/utils/URLMapping"

const Dashboard = () => {
  const { API } = useAPI();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [japaneseCourses, setJapaneseCourses] = useState<any[]>([]);

  const handleViewDetails = (course: Course) => {
    navigate(`/coursedetail`, { state: { course } })
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await API.get(URLMapping.LIST_COURSE);
        setJapaneseCourses(response.content);
        setLoading(false);
      } catch (err: any) {
        setError("Không thể tải dữ liệu khóa học.");
        setLoading(false);
      }
    };
    loadData();
  }, [API]);

  return (
    <AutoLayout>
      {loading ? (
        <div className="text-center text-blue-500">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="text-center text-red-500">Lỗi: {error}</div>
      ) : (
        <CourseListPage
          courses={japaneseCourses}
          onViewDetails={handleViewDetails}
          onAddCourse={() => {}}
        />
      )}
    </AutoLayout>
  )
}

export default Dashboard
