import AutoLayout from "@/components/layout/AutoLayout";
import { AddLessonPage } from "@/components/sections/staff/add-unit-page";
import { Subject,Chapter } from "@/components/sections/entity";

const testSubject: Subject = {
  id: 1,
  title: "Lập trình Web cơ bản",
  topic: "Web Development",
  description: "Khóa học này hướng dẫn bạn các kiến thức cơ bản về lập trình web.",
  level: "Beginner",
  estimatedDuration: "10 giờ",
  creatorId: "user123",
  image: "https://via.placeholder.com/150",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: "published",
  orderNumber: 1,
  chapters: [
    {
      id: 1,
      title: "Giới thiệu HTML",
      description: "Tìm hiểu HTML cơ bản",
      orderNumber: 1,
      subjectId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lessonCount: 3,
      duration: "1 giờ 30 phút",
    }

  ],
  studentCount: 150,
  lessonCount: 7,
  rating: 4.8,
}


interface AddLessonPageProps {
  course: Subject
  chapter: Chapter   // 👈 chỉ nhận 1 chương, không phải mảng
}


const AddNewUnit: React.FC = () => {
  const handleBack = () => {
    window.history.back();
  };

  const handleCreateLesson = (lessonData: {
    unitId: string;
    unitDescription: string;
    prerequisiteUnit: string;
    chapterId: number;
    materials: Array<{
      skill: string;
      name: string;
      description: string;
      url: string;
    }>;
  }) => {
    // Xử lý dữ liệu tạo unit mới ở đây (gọi API hoặc log ra console)
    console.log('Tạo unit mới:', lessonData);
    // Ví dụ: alert('Tạo unit thành công!');
  };

  return (
    <AutoLayout>
      <AddLessonPage
        course={testSubject}
        chapter={testSubject.chapters[0]}
        onBack={handleBack}
        onCreateLesson={handleCreateLesson}
      />
    </AutoLayout>
  );
};

export default AddNewUnit;
