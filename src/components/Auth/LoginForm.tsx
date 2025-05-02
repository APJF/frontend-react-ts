// src/components/Auth/LoginForm.tsx
import React, { useState } from 'react';
import { login } from '../../services/authService';
import type { LoginDTO, ApiResponse } from '../../types/auth.d.ts';

interface LoginFormProps {
  onSuccess: (message: string) => void; // Callback khi login thành công
  onForgotPasswordClick: () => void; // Callback khi nhấn nút Forgot Password
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onForgotPasswordClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Reset lỗi trước khi submit
    setIsLoading(true);

    if (!email || !password) {
        setError("Please enter both email and password.");
        setIsLoading(false);
        return;
    }

    const credentials: LoginDTO = { email, password };
    const response: ApiResponse = await login(credentials);

    setIsLoading(false);

    if (response.success) {
      // Gọi callback thành công từ props
      onSuccess(response.message);
      // Reset form (tùy chọn)
      // setEmail('');
      // setPassword('');
    } else {
      setError(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div className="social-icons">
          <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
          <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
      </div>
      <span>or use your email password</span>
      {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required // Thêm required nếu muốn trình duyệt validate
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading}
      />
      {/* Sử dụng button hoặc div/span có onClick thay vì thẻ a thuần túy */}
       <a href="#" onClick={(e) => { e.preventDefault(); onForgotPasswordClick(); }}>Forget Your Password?</a>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;