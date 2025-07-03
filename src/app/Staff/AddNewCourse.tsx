import AutoLayout from "@/components/layout/AutoLayout";
import { CreateCoursePage } from "@/components/sections/staff/create-course-page";
import toast from "react-hot-toast";



const AddNewCourse: React.FC = () => {
  // Hàm gửi dữ liệu lên API
  const handleCreateCourse = async (courseData: {
    id: string;
    title: string;
    description: string;
    estimatedDuration: string;
    level: string;
    image: string;
    requirement: string;
    prerequisite: string;
  }) => {
    try {
      const apiData = {
        ...courseData,
        estimatedDuration: Number(courseData.estimatedDuration),
        image: courseData.image || null,
        requirement: courseData.requirement || null,
        prerequisite: courseData.prerequisite || null,
        status: "DRAFT"
      };
      const response = await fetch("http://localhost:8082/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });
      if (!response.ok) throw new Error("Tạo khóa học thất bại!");
      toast.success("Tạo khóa học thành công!");
      window.location.href = "/staff/courses";
    } catch (err) {
      toast.error("Có lỗi khi tạo khóa học!");
    }
  };

  // Hàm quay lại trang trước
  const handleBack = () => {
    window.history.back();
  };

  return (
    <AutoLayout>
      <CreateCoursePage onBack={handleBack} onCreateCourse={handleCreateCourse} />
    </AutoLayout>
  );
};

export default AddNewCourse;
