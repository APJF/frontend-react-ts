import AutoLayout from "@/components/layout/AutoLayout";
import { CreateCoursePage } from "@/components/sections/staff/create-course-page";
import { Subject } from "@/components/sections/entity";



const AddNewCourse: React.FC = () => {

  return (
    <AutoLayout>
      <CreateCoursePage onBack={function (): void {
              throw new Error("Function not implemented.");
          } } onCreateCourse={function (courseData: Omit<Subject, "id" | "createdAt" | "updatedAt" | "chapters">): void {
              throw new Error("Function not implemented.");
          } }/>
    </AutoLayout>
  );
};

export default AddNewCourse;
