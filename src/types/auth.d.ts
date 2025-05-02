// src/types/auth.d.ts
export interface LoginDTO {
    email?: string; // Đặt là optional nếu bạn muốn validate trong component
    password?: string;
  }
  
  export interface RegisterDTO {
    username?: string; // Giả định dựa trên HTML, cần xác nhận lại DTO backend
    email?: string;
    password?: string;
  }
  
  export interface ApiResponse<T = any> { // Định nghĩa kiểu trả về chung từ backend
    success: boolean;
    message: string;
    data?: T; // Thêm data nếu API trả về dữ liệu cụ thể
  }