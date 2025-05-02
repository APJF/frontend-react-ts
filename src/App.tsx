// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'; // Chỉ cần import Routes, Route,...
import AuthPage from './pages/AuthPage';
// import DashboardPage from './pages/DashboardPage';

function App() {
  const isAuthenticated = false; 

  // KHÔNG còn <Router> ở đây nữa
  return ( 
    <Routes> 
      <Route path="/" element={<Navigate replace to="/auth" />} /> 
      <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/dashboard" />} /> 
      {/* <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth" />} /> */}
      <Route path="*" element={<Navigate replace to="/auth" />} /> 
    </Routes>
  );
}
export default App;