// src/services/authService.ts
import axios from 'axios';
import type { LoginDTO, RegisterDTO, ApiResponse } from '../types/auth.d.ts';

// !!! QUAN TRỌNG: Thay đổi baseURL thành địa chỉ backend của bạn
const API_BASE_URL = 'http://localhost:8080/api/auth'; // Ví dụ

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Login ---
export const login = async (credentials: LoginDTO): Promise<ApiResponse> => {
  try {
    // Backend trả về ResponseEntity<ApiResponseDTO>, axios sẽ lấy phần body
    const response = await apiClient.post<ApiResponse>('/login', credentials);
    return response.data; // Trả về { success: boolean, message: string }
  } catch (error: any) {
    // Xử lý lỗi từ axios hoặc backend trả về lỗi cụ thể
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    return { success: false, message: errorMessage };
  }
};

// --- Register ---
export const register = async (userData: RegisterDTO): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/register', userData);
    return response.data; // Trả về { success: boolean, message: string }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
    return { success: false, message: errorMessage };
  }
};

// --- Verify Account ---
export const verifyAccount = async (email: string, otp: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/verify', null, { // Dữ liệu gửi qua query params
      params: { email, otp }
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Account verification failed';
    return { success: false, message: errorMessage };
  }
};

// --- Regenerate OTP ---
export const regenerateOtp = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/regenerate-otp', null, {
      params: { email }
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'OTP regeneration failed';
    return { success: false, message: errorMessage };
  }
};

// --- Forgot Password ---
export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/forgot-password', null, {
      params: { email }
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Forgot password request failed';
    return { success: false, message: errorMessage };
  }
};

// --- Reset Password ---
export const resetPassword = async (email: string, newPassword: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post<ApiResponse>('/reset-password', null, {
      params: { email, newPassword } // Chú ý: Backend đang nhận newPassword qua @RequestParam
                                       // Nếu muốn gửi qua body, cần thay đổi backend hoặc cách gọi API
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Password reset failed';
    return { success: false, message: errorMessage };
  }
};