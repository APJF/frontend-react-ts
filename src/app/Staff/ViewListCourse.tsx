import AutoLayout from "@/components/layout/AutoLayout";
import { CourseListPage } from "@/components/sections/staff/course-list";
import { Subject } from "../../components/sections/entity";

const mockCourses: Subject[] = [
  {
    id: 1,
    title: "Tiếng Nhật sơ cấp N5",
    topic: "Ngôn ngữ",
    description: "Học Hiragana, Katakana và ngữ pháp cơ bản.",
    level: "Sơ cấp",
    estimatedDuration: "6 tuần",
    creatorId: "admin123",
    image: "https://example.com/japanese-n5.jpg",
    createdAt: "2025-06-01T10:00:00Z",
    updatedAt: "2025-06-20T15:30:00Z",
    status: "Published",
    orderNumber: 1,
    studentCount: 1200,
    lessonCount: 24,
    rating: 4.7,
    chapters: [],
  },
  {
    id: 2,
    title: "Luyện giao tiếp tiếng Nhật N5",
    topic: "Giao tiếp",
    description: "Rèn luyện kỹ năng hội thoại đơn giản trong cuộc sống hàng ngày.",
    level: "Sơ cấp",
    estimatedDuration: "4 tuần",
    creatorId: "teacher001",
    image: "https://example.com/conversation-n5.jpg",
    createdAt: "2025-06-10T12:00:00Z",
    updatedAt: "2025-06-21T08:30:00Z",
    status: "Draft",
    orderNumber: 2,
    studentCount: 850,
    lessonCount: 16,
    rating: 4.5,
    chapters: [],
  }
];

const Dashboard: React.FC = () => {

    const handleViewDetails = (course: Subject) => {
    console.log("Chi tiết khóa học:", course.title);
  };

  const handleAddCourse = () => {
    console.log("Thêm khóa học mới");
  };

  return (
    <AutoLayout>
      <CourseListPage
              courses={mockCourses}
              onViewDetails={handleViewDetails}
              onAddCourse={handleAddCourse}
            />
    </AutoLayout>
  );
};

export default Dashboard;
