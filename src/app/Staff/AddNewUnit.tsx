import AutoLayout from "@/components/layout/AutoLayout";
import { AddLessonPage } from "@/components/sections/staff/add-unit-page";
import { Chapter, Subject } from "@/components/sections/entity";
import { useAPI } from "@/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import URLMapping from "@/utils/URLMapping";

const AddNewUnit: React.FC = () => {
  const { API } = useAPI();
  const navigate = useNavigate();
  const { courseId, chapterId } = useParams();
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

  const selectedChapter = course?.chapters.find(
    (ch) => ch.id === Number(chapterId)
  );


  const handleCreateSlotWithMaterials = async (slotData: {
    title: string;
    description: string;
    orderNumber: number;
    chapterId: number;
    materials: Array<{
      type: string;
      name: string;
      description: string;
      file?: File;
    }>;
  }) => {
    try {
      // B1: Tạo slot
      const slotRes = await API.post(URLMapping.UNIT_CREATE, {
        title: slotData.title,
        description: slotData.description,
        orderNumber: slotData.orderNumber,
        chapterId: slotData.chapterId,
      });
      const slotId = slotRes.data.id;

      // B2: Tạo material cho slot đó
      for (const material of slotData.materials) {
        const formData = new FormData();
        formData.append("type", material.type);
        formData.append("name", material.name);
        formData.append("description", material.description);
        formData.append("slotId", slotId.toString());

        if (material.file) {
          formData.append("file", material.file);
        }

        await API.post("/materials/create", formData);
      }

      // B3: Refresh dữ liệu chương
      const updatedChapterRes = await API.get(`/chapters/${slotData.chapterId}`);
      setChapter(updatedChapterRes.data); // setChapter là hàm cập nhật lại UI

    } catch (error) {
      console.error("Error creating slot with materials:", error);
    }
  };


  if (!course) {
    return <p>Đang tải thông tin môn học...</p>;
  } else {
    return (
      <AutoLayout>
        <AddLessonPage
          course={course}
          chapter={selectedChapter!} // đảm bảo không null
          onBack={() => navigate(-1)}
          onCreateLesson={handleCreateSlotWithMaterials}
        />
      </AutoLayout>
    );
  }
};

export default AddNewUnit;
