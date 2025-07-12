import AutoLayout from "@/components/layout/AutoLayout";
import { AddChapterPage } from "@/components/sections/staff/add-chapter-page";
import { Subject } from "@/components/sections/entity";
import { useLocation } from "react-router-dom";

interface AddChapterPagePorps {
  course: Subject
  onBack: () => void
}

const AddNewChapter: React.FC = () => {
  const location = useLocation();
  const course = location.state?.course;

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
