import AutoLayout from "@/components/layout/AutoLayout";
import { CourseListPage } from "@/components/sections/staff/course-list";
import { Subject } from "../../components/sections/entity";
import ManagerApprovalInterface from "../Manager/ApproveStaffRequest";
// Dữ liệu mock để test


const Dashboard: React.FC = () => {
    
  

  return (
    <AutoLayout>
      <ManagerApprovalInterface/>
    </AutoLayout>
  );
};

export default Dashboard;
