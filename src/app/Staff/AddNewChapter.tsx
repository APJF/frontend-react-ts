import AutoLayout from "@/components/layout/AutoLayout";
import { AddChapterPage } from "@/components/sections/staff/add-chapter-page";
import { Subject } from "@/components/sections/entity";

interface AddChapterPagePorps {
  course: Subject
  onBack: () => void
}


const AddNewCourse: React.FC = () => {

  return (
    <AutoLayout>
      <AddChapterPage course={undefined} onBack={function (): void {
              throw new Error("Function not implemented.");
          } } onCreateChapter={function (chapterData: { title: string; description: string; orderNumber: number; subjectId: number; }): void {
              throw new Error("Function not implemented.");
          } }/>
    </AutoLayout>
  );
};

export default AddNewCourse;
