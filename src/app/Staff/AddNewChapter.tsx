import AutoLayout from "@/components/layout/AutoLayout";
import { AddChapterPage } from "@/components/sections/staff/add-chapter-page";
import { Course } from "@/components/sections/entity";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface AddChapterPagePorps {
  course: Course
  onBack: () => void
}

const AddNewChapter: React.FC = () => {
  const location = useLocation();
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ưu tiên lấy course từ state nếu có
    if (location.state?.course) {
      setCourse(location.state.course);
      setLoading(false);
    } else if (courseId) {
      setLoading(true);
      fetch(`http://localhost:8080/api/courses/${courseId}`)
        .then(res => res.json())
        .then(res => {
          if (res.success && res.data) setCourse(res.data);
          else setCourse(null);
        })
        .catch(() => setCourse(null))
        .finally(() => setLoading(false));
    } else {
      setCourse(null);
      setLoading(false);
    }
  }, [location.state, courseId]);

  if (loading) {
    return <div>Đang tải thông tin khóa học...</div>;
  }

  if (!course) {
    return <div>Không tìm thấy thông tin khóa học.</div>;
  }

  const handleCreateChapter = (chapterData: {
    chapterId: string;
    title: string;
    description: string;
    prerequisiteChapter: string;
    subjectId: number;
  }) => {
    // Gửi dữ liệu lên API hoặc xử lý logic ở đây
    console.log("Tạo chương mới:", chapterData);
  };

  return (
    <AutoLayout>
      <AddChapterPage course={course} onBack={() => window.history.back()} onCreateChapter={handleCreateChapter} />
    </AutoLayout>
  );
};

export default AddNewChapter;
