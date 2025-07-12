import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './app/Authentication/LoginPage';
import RegisterPage from './app/Authentication/RegisterPage';
import CourseListPage from './app/Common/CourseListPage'
import CourseDetail from './components/sections/common/course-detail';
import HomePage from './app/page';
import ChatbotPage from './app/Common/ChatBot';
import SlotSkills from './components/sections/common/slot-skills';
import Vocabulary from './components/sections/common/vocabulary';
import JapaneseLearningPage from './components/sections/common/japanese-learning-page';
import Dashboard from './app/Admin/Dashboard';
import StaffViewListCourse from './app/Staff/ViewListCourse';
import AddNewCourse from './app/Staff/AddNewCourse';
import ViewCourseDetail from './app/Staff/CourseDetail';
import ManagerApprovalInterface from './app/Manager/ApproveStaffRequest';
import ViewRequestFeedback from './app/Staff/ViewRequestFeedback'
import TestHistory from "./app/Common/TestHistory"
import AddNewChapter from './app/Staff/AddNewChapter';
import AddNewUnit from './app/Staff/AddNewUnit';
import ChapterDetailPage from './app/Staff/ChapterDetail';
import UnitDetailPage from './app/Staff/UnitDetail';
import { UpdateCoursePage } from "@/components/sections/staff/update-course-page";
import { UpdateChapterPage } from "@/components/sections/staff/update-chapter-page";
import { UpdateUnitPage } from "@/components/sections/staff/update-unit-page";
import TestPreparationPage from './app/Common/TestPreparationPage';
import TestDoPage from './app/Common/TestDoPage';
import TestResultPage from './app/Common/TestResultPage';
import TestReviewPage from './app/Common/TestReviewPage';

function App() {
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Thay vì AuthPage, bạn có thể render LoginPage hoặc một component khác */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/courselist" element={<CourseListPage />} />
      <Route path="/coursedetail/:id" element={<CourseDetail />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/slot/:id" element={<SlotSkills />} />
      <Route path="/vocabulary" element={<Vocabulary />} />
      <Route path="/materials/slot/:id" element={<JapaneseLearningPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/viewlistcourse" element={<StaffViewListCourse />} />
      <Route path="/addnew" element={<AddNewCourse />} />
      <Route path="/coursedetail" element={<ViewCourseDetail />} />
      <Route path="/addchapter" element={<AddNewChapter />} />
      <Route path="/addunit" element={<AddNewUnit />} />
      <Route path="/chapterdetail" element={<ChapterDetailPage />} />
      <Route path="/unitdetail" element={<UnitDetailPage />} />
      <Route path="/updatecourse" element={<UpdateCoursePage />} />
      <Route path="/updatechapter" element={<UpdateChapterPage />} />
      <Route path="/updateunit" element={<UpdateUnitPage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/manager/request" element={<Dashboard />} />
      <Route path="/staff/viewrequestfeedback" element={<ViewRequestFeedback />} />
      <Route path="/test" element={<Navigate to="/test/preparation/1" />} />
      <Route path="/test/preparation/:quizId" element={<TestPreparationPage />} />
      <Route path="/test/do/:quizId" element={<TestDoPage />} />
      <Route path="/test/result/:attemptId" element={<TestResultPage />} />
      <Route path="/test/review/:attemptId" element={<TestReviewPage />} />
    </Routes>
  )
}

export default App
