import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './app/Authentication/LoginPage';
import RegisterPage from './app/Authentication/RegisterPage';
import CourseListPage from './app/Common/CourseListPage'
import CourseDetail from './components/sections/course-detail';
import HomePage from './app/page';
import ChatbotPage from './app/Common/ChatBot';

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
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default App
