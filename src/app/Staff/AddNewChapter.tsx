import AutoLayout from "@/components/layout/AutoLayout";
import { AddChapterPage } from "@/components/sections/staff/add-chapter-page";
import { CreateChapterDTO, Subject } from "@/components/sections/entity";
import { useAPI } from "@/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import URLMapping from "@/utils/URLMapping";

const AddNewChapter: React.FC = () => {
  const { API } = useAPI();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!course && courseId) {
          const response = await API.get(URLMapping.SUBJECT_DETAIL + `/${courseId}`);
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

  const handleBack = () => {
    navigate(-1); // hoặc navigate(`/admin/subjects/${subjectId}`);
  };

  const handleCreateChapter = async (chapterData: CreateChapterDTO) => {
    try {
      console.log("Dữ liệu tạo chapter:", chapterData);
      const response = await API.post(URLMapping.CHAPTER_CREATE, chapterData);
      navigate(`/detail/${courseId}`, { state: { course } }); // quay lại chi tiết subject
    } catch (error) {
      console.error("Tạo chương thất bại:", error);
      alert("Tạo chương thất bại.");
    }
  };

  if (!course) {
    return <p>Đang tải thông tin môn học...</p>;
  } else {
    return (
      <AutoLayout>
        <AddChapterPage
          course={course}
          onBack={handleBack}
          onCreateChapter={handleCreateChapter}
        />
      </AutoLayout>
    );
  }

};

export default AddNewChapter;
