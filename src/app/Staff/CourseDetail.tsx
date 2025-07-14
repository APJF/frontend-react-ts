import { useLocation, useNavigate, useParams } from "react-router-dom";
import AutoLayout from "@/components/layout/AutoLayout";
import type { Course } from "@/components/sections/entity";
import { CourseDetailLayoutPage } from "@/components/sections/staff/course-detail-layout-page";
import { useEffect, useState } from "react";
import URLMapping from "@/utils/URLMapping";
import { useAPI } from "@/hooks";

const ViewCourseDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { API } = useAPI();

  // State để lưu trữ course
  const [course, setCourse] = useState<Course | undefined>(
    location.state?.course as Course | undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!course && courseId) {
          const response = await API.get(URLMapping.COURSE_DETAIL + `${courseId}`);
          setCourse(response); // Gán course lấy từ API
        }
      } catch (err) {
        setError("Không thể tải dữ liệu khóa học.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [course, courseId]);

  if (loading) {
    return (
      <AutoLayout>
        <div className="p-6 text-gray-600 font-medium">Đang tải dữ liệu...</div>
      </AutoLayout>
    );
  }

  if (error || !course) {
    return (
      <AutoLayout>
        <div className="p-6 text-red-600 font-semibold">
          {error || "Không tìm thấy dữ liệu khóa học."}
          <button onClick={() => navigate(-1)} className="text-blue-600 underline ml-2">
            Quay lại
          </button>
        </div>
      </AutoLayout>
    );
  }

  return (
    <AutoLayout>
      <CourseDetailLayoutPage course={course} onBack={() => navigate(-1)} />
    </AutoLayout>
  );
};

export default ViewCourseDetail;
