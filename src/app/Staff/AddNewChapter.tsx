import AutoLayout from "@/components/layout/AutoLayout";
import { AddChapterPage } from "@/components/sections/staff/add-chapter-page";
import { Subject } from "@/components/sections/entity";

interface AddChapterPagePorps {
  course: Subject
  onBack: () => void
}

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
    },
    {
      id: 2,
      title: "Giới thiệu CSS",
      description: "Cách làm đẹp trang web với CSS",
      orderNumber: 2,
      subjectId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lessonCount: 4,
      duration: "2 giờ",
    }
  ],
  studentCount: 150,
  lessonCount: 7,
  rating: 4.8,
}



const AddNewChapter: React.FC = () => {

  return (
    <AutoLayout>
      <AddChapterPage course={testSubject} onBack={function (): void {
              throw new Error("Function not implemented.");
          } } onCreateChapter={function (chapterData: { title: string; description: string; orderNumber: number; subjectId: number; }): void {
              throw new Error("Function not implemented.");
          } }/>
    </AutoLayout>
  );
};

export default AddNewChapter;
