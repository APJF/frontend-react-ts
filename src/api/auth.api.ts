// src/api/auth.api.ts
import { SuccessResponseApi } from '../types/util.type' // Đảm bảo import đúng
import { RegisterFormData } from '../utils/rules'
import http from '../utils/http'

const AUTH_URL = '/api/auth'

const authApi = {
  registerAccount(body: Omit<RegisterFormData, 'confirm_password'>) {
    return http.post<SuccessResponseApi<null>>(`${AUTH_URL}/register`, body)
  },


  verifyOtp(data: { email: string; otp: string }) {
    return http.post<SuccessResponseApi<null>>(
      `${AUTH_URL}/verify`, // Endpoint
      null, // Không cần gửi request body (body là null)
      {
        params: {
          email: data.email, // Tham số email
          otp: data.otp      // Tham số otp
        }
      }
    )
  },

  regenerateOtp(email: string) {
    return http.post<SuccessResponseApi<null>>(`${AUTH_URL}/regenerate-otp`, null, {
      params: { email }
    })
  }

}
export default authApi