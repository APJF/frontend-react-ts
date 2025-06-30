import { useLocation, useNavigate } from "react-router-dom";
import AutoLayout from "@/components/layout/AutoLayout";
import { CourseDetailPage } from "@/components/sections/staff/course-detail-page";
import type { Subject } from "@/components/sections/entity";

const ViewCourseDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course as Subject | undefined;

  // Nếu không có course, chuyển hướng hoặc hiển thị thông báo
  if (!course) {
    return (
      <AutoLayout>
        <div className="p-6 text-red-600 font-semibold">
          Không tìm thấy dữ liệu khóa học.
          <button onClick={() => navigate(-1)} className="text-blue-600 underline ml-2">Quay lại</button>
        </div>
      </AutoLayout>
    );
  }

  return (
    <AutoLayout>
      <CourseDetailPage course={course} onBack={() => navigate(-1)} />
    </AutoLayout>
  );
};

export default ViewCourseDetail;
