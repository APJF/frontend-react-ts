// src/components/Auth/VerifyOtpForm.tsx
import React, { useState } from 'react';
import { verifyAccount, regenerateOtp } from '../../services/authService';
import type { ApiResponse } from '../../types/auth.d.ts';

interface VerifyOtpFormProps {
    email: string; // Email được truyền từ AuthPage
    onSuccess: (message: string) => void; // Callback khi verify thành công
}

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({ email, onSuccess }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(`An OTP has been sent to ${email}. Please check your inbox.`); // Thông báo ban đầu
    const [isLoading, setIsLoading] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);

    const handleVerifySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setMessage(null);
        setIsLoading(true);

        if (!otp || otp.length < 6) { // Giả sử OTP có 6 ký tự
            setError("Please enter a valid OTP.");
            setIsLoading(false);
            return;
        }

        const response: ApiResponse = await verifyAccount(email, otp);
        setIsLoading(false);

        if (response.success) {
            onSuccess(response.message);
        } else {
            setError(response.message);
        }
    };

     const handleRegenerateOtp = async () => {
        setError(null);
        setMessage(null);
        setIsRegenerating(true);

        const response: ApiResponse = await regenerateOtp(email);
        setIsRegenerating(false);

         if (response.success) {
            setMessage(response.message + " Please check your email again."); // Cập nhật thông báo
        } else {
            setError(response.message);
        }
    };


    return (
        // Bạn cần style component này cho phù hợp
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Verify Your Account</h2>
            {message && <p style={{ color: 'green', fontSize: '12px' }}>{message}</p>}
            {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
            <form onSubmit={handleVerifySubmit}>
                <p>Enter the OTP sent to {email}</p>
                <input
                    type="text" // Có thể dùng type="number"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6} // Giả sử OTP 6 ký tự
                    required
                    disabled={isLoading}
                    style={{ width: '100%', marginBottom: '10px', padding: '10px' /* Thêm style */ }}
                />
                <button type="submit" disabled={isLoading} style={{ padding: '10px 20px', marginRight: '10px' /* Thêm style */ }}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
                 <button type="button" onClick={handleRegenerateOtp} disabled={isRegenerating} style={{ padding: '10px 20px' /* Thêm style */ }}>
                    {isRegenerating ? 'Sending...' : 'Resend OTP'}
                </button>
            </form>
        </div>
    );
};

export default VerifyOtpForm;