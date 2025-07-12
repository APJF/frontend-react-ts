import AutoLayout from "@/components/layout/AutoLayout";
import { CreateCoursePage } from "@/components/sections/staff/create-course-page";
import { Subject } from "@/components/sections/entity";
import { useNavigate } from "react-router-dom";
import { useAPI } from "@/hooks"; // Giả sử bạn đã có useAPI hook
import URLMapping from "@/utils/URLMapping";

const AddNewCourse: React.FC = () => {
  const navigate = useNavigate();
  const { API } = useAPI();

  const handleBack = () => {
    navigate(-1); // hoặc navigate("/admin/subjects");
  };

  const handleCreateCourse = async (
    courseData: Omit<Subject, "id" | "createdAt" | "updatedAt" | "chapters">
  ) => {
    try {
      const response = await API.post(URLMapping.SUBJECT_CREATE, courseData);
      console.log("Tạo môn học thành công:", response.data);
      navigate("/viewlistcourse"); // hoặc tới trang chi tiết
    } catch (error) {
      console.error("Tạo môn học thất bại:", error);
      alert("Đã xảy ra lỗi khi tạo môn học.");
    }
  };

  return (
    <AutoLayout>
      <CreateCoursePage
        onBack={handleBack}
        onCreateCourse={handleCreateCourse}
      />
    </AutoLayout>
  );
};

export default AddNewCourse;
