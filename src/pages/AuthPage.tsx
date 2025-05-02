// src/pages/AuthPage.tsx
import React, { useState, useEffect } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
// Import các form khác khi bạn tạo chúng
import VerifyOtpForm from '../components/Auth/VerifyOtpForm';
// import ForgotPasswordForm from '../components/Auth/ForgotPasswordForm';
// import ResetPasswordForm from '../components/Auth/ResetPasswordForm';
import '../styles/AuthPage.css'; // Import CSS

// Enum để quản lý các màn hình con
enum AuthView {
  LOGIN,
  REGISTER,
  VERIFY_OTP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
}

const AuthPage: React.FC = () => {
  // State để quản lý trạng thái active (tương tự class 'active' trong JS cũ)
  const [isRegisterActive, setIsRegisterActive] = useState(false);
  // State để quản lý màn hình nào đang hiển thị (mở rộng cho các chức năng khác)
  const [currentView, setCurrentView] = useState<AuthView>(AuthView.LOGIN);
  // State để lưu email (ví dụ: cần cho màn hình verify OTP)
  const [emailForVerification, setEmailForVerification] = useState<string | null>(null);

  // useEffect để đồng bộ isRegisterActive với currentView khi cần
   useEffect(() => {
    setIsRegisterActive(currentView === AuthView.REGISTER);
  }, [currentView]);


  // --- Hàm xử lý chuyển đổi giữa Login và Register ---
  const handleShowRegister = () => {
    // setIsRegisterActive(true); // Cách cũ dựa trên class
     setCurrentView(AuthView.REGISTER); // Cách mới dựa trên state view
  };

  const handleShowLogin = () => {
    // setIsRegisterActive(false); // Cách cũ
    setCurrentView(AuthView.LOGIN); // Cách mới
  };

  // --- Hàm Callback sau khi Register thành công ---
  const onRegisterSuccess = (email: string) => {
    console.log("Register success callback triggered for:", email); // Check 1
    setEmailForVerification(email);
    setCurrentView(AuthView.VERIFY_OTP);
    console.log("Current view set to:", AuthView.VERIFY_OTP); // Check 2
    alert("Registration successful! Please check your email for OTP.");
};

   // --- Hàm Callback sau khi Login thành công ---
  const onLoginSuccess = (message: string) => {
      console.log("Login successful:", message);
      // TODO: Chuyển hướng người dùng đến trang dashboard hoặc trang chính
      // Ví dụ: history.push('/dashboard') nếu dùng react-router
      alert(`Login Success: ${message}`); // Thông báo tạm thời
  };

  // --- Hàm Callback sau khi Verify OTP thành công ---
   const onVerifySuccess = (message: string) => {
       console.log("Verification successful:", message);
       alert(`Verification Success: ${message}. You can now login.`);
       setCurrentView(AuthView.LOGIN); // Quay lại màn hình Login
   };

   // --- Hàm Callback sau khi yêu cầu Forgot Password thành công ---
    const onForgotPasswordSuccess = (message: string) => {
        console.log("Forgot password request successful:", message);
        alert(`Forgot Password: ${message}. Check your email.`);
        // Có thể chuyển về login hoặc hiển thị thông báo
         setCurrentView(AuthView.LOGIN);
    };

     // --- Hàm Callback sau khi Reset Password thành công ---
    const onResetPasswordSuccess = (message: string) => {
        console.log("Reset password successful:", message);
        alert(`Reset Password Success: ${message}. You can now login with your new password.`);
        setCurrentView(AuthView.LOGIN); // Quay lại màn hình Login
    };


  // --- Render nội dung dựa trên currentView ---
  const renderCurrentView = () => {
    switch (currentView) {
      case AuthView.LOGIN:
        return <LoginForm onSuccess={onLoginSuccess} onForgotPasswordClick={() => setCurrentView(AuthView.FORGOT_PASSWORD)} />;
      case AuthView.REGISTER:
        return <RegisterForm onSuccess={onRegisterSuccess} />;
      // case AuthView.VERIFY_OTP:
      //   return emailForVerification ? (
      //       <VerifyOtpForm email={emailForVerification} onSuccess={onVerifySuccess} />
      //   ) : ( // Xử lý trường hợp không có email (ví dụ: reload trang)
      //       <p>Error: Email not found for verification. Please try registering again.</p>
      //   );
      // case AuthView.FORGOT_PASSWORD:
      //    return <ForgotPasswordForm onSuccess={onForgotPasswordSuccess} onBackToLogin={() => setCurrentView(AuthView.LOGIN)} />;
      // case AuthView.RESET_PASSWORD:
         // Cần lấy email và token (nếu có) từ URL hoặc state trước đó
         // return <ResetPasswordForm email={"test@example.com"} /* pass email */ onSuccess={onResetPasswordSuccess} />;
      default:
        return <LoginForm onSuccess={onLoginSuccess} onForgotPasswordClick={() => setCurrentView(AuthView.FORGOT_PASSWORD)} />;
    }
  };


  return (
    // Sử dụng className để áp dụng CSS từ AuthPage.css
    // Thêm class 'active' dựa trên state isRegisterActive
    <div className={`container ${isRegisterActive ? 'active' : ''}`} id="container">
        {/* Phần Form Container sẽ chứa component form tương ứng */}
        <div className="form-container sign-up">
             {/* Chỉ render RegisterForm khi view là REGISTER hoặc LOGIC cũ là isRegisterActive */}
             {currentView === AuthView.REGISTER && <RegisterForm onSuccess={onRegisterSuccess} />}
        </div>
        <div className="form-container sign-in">
                {/* Chỉ render LoginForm khi view là LOGIN hoặc LOGIC cũ là !isRegisterActive */}
                {currentView === AuthView.LOGIN && <LoginForm onSuccess={onLoginSuccess} onForgotPasswordClick={() => setCurrentView(AuthView.FORGOT_PASSWORD)} />}
                {/* Render các form khác ở đây nếu cần thiết và phù hợp với layout */}
                {currentView === AuthView.VERIFY_OTP && emailForVerification && <VerifyOtpForm email={emailForVerification} onSuccess={onVerifySuccess} />}
                {/* {currentView === AuthView.FORGOT_PASSWORD && <ForgotPasswordForm onSuccess={onForgotPasswordSuccess} onBackToLogin={() => setCurrentView(AuthView.LOGIN)} />} */}
                
                {/* {currentView === AuthView.RESET_PASSWORD && <ResetPasswordForm email={"test@example.com"} onSuccess={onResetPasswordSuccess} />} */}
            </div>


       {/* Phần Toggle Container để chuyển đổi */}
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    {/* Nút này sẽ gọi hàm để hiển thị form Login */}
                    <button className="hidden" id="login" onClick={handleShowLogin}>Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                     {/* Nút này sẽ gọi hàm để hiển thị form Register */}
                    <button className="hidden" id="register" onClick={handleShowRegister}>Sign Up</button>
                </div>
            </div>
        </div>

       {/* Optional: Hiển thị các form khác (Verify, Forgot, Reset) bên ngoài cấu trúc toggle nếu muốn */}
       {/* {currentView === AuthView.VERIFY_OTP && emailForVerification && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'white', zIndex: 100 }}>
                <VerifyOtpForm email={emailForVerification} onSuccess={onVerifySuccess} />
            </div>
        )} */}
         {/* Tương tự cho ForgotPasswordForm và ResetPasswordForm */}

    </div>
  );
};

export default AuthPage;