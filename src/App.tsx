import { Routes, Route} from 'react-router-dom'
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
import AddNewChapter from './app/Staff/AddNewChapter';
import AddNewUnit from './app/Staff/AddNewUnit';
import { FeedbackManagerPage } from './components/sections/staff/feedback-manager-page';
import SimpleVerify from './components/auth/Verify';
import ChangePassPage from './app/Authentication/ChangePassPage';
import FogotPassPage from './app/Authentication/FogotPassPage';
import ResetPassPage from './app/Authentication/ResetPassPage';

function App() {
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Thay vì AuthPage, bạn có thể render LoginPage hoặc một component khác */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify" element={<SimpleVerify />} />
      <Route path="/courselist" element={<CourseListPage />} />
      <Route path="/coursedetail/:id" element={<CourseDetail />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/slot/:id" element={<SlotSkills />} />
      <Route path="/vocabulary" element={<Vocabulary />} />
      <Route path="/materials/slot/:id" element={<JapaneseLearningPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/viewlistcourse" element={<StaffViewListCourse />} />
      <Route path="/addnew" element={<AddNewCourse />} />
      <Route path="/detail/:courseId" element={<ViewCourseDetail />} />
      <Route path="/addchapter/:courseId" element={<AddNewChapter />} />
      <Route path="/addunit/:courseId/:chapterId" element={<AddNewUnit />} />
      <Route path="/feedback" element={<FeedbackManagerPage />} />
      <Route path="/changepass" element={<ChangePassPage />} />
      <Route path="/fogotpass" element={<FogotPassPage />} />
      <Route path="/resetpass" element={<ResetPassPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default App
