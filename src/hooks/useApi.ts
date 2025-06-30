import { useNavigate } from "react-router-dom";
import { useMemo } from "react"; // <-- thêm dòng này
import { API_URL } from "@/utils/URLMapping";

export function useAPI() {
  const navigate = useNavigate();

  const API = useMemo(() => {
    const request = async (
      method: string,
      url: string,
      data: any = {},
      showToast: boolean = false,
      showLoadingUI: boolean = true
    ): Promise<any> => {
      url = url.startsWith("/") ? url.slice(1) : url;

      const headers: any = {
        ...(!(data instanceof FormData) && { 'Content-Type': 'application/json' }),
      };

      try {
        const options: RequestInit = {
          method,
          headers
        };

        if (method !== 'GET' && method !== 'DELETE') {
          options.body = data instanceof FormData ? data : JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}/api/${url}`, options);

        if (!response.ok) {
          return handleErrorResponse(response, showToast);
        }

        const responseData = await response.json();
        responseData.success = true;
        return responseData;
      } catch (error) {
        return handleErrorResponse(error, showToast);
      }
    };

    const handleErrorResponse = async (response: any, showToast: boolean = true): Promise<any> => {
      try {
        let message = "Error";
        let status = response?.status;
        let responseData = await response.json();

        if (responseData?.message) {
          message = responseData.message;
        } else {
          message = response?.statusText || "Error";
        }

        switch (status) {
          case 401:
            navigate("/login");
            break;
        }

        responseData.success = false;
        responseData.message = message;
        responseData.status = status;
        return responseData;
      } catch (err) {
        return { success: false, message: "Disconnected" };
      }
    };

    return {
      get: (url: string, showToast = true, showLoading = true) =>
        request("GET", url, {}, showToast, showLoading),

      post: (url: string, data: any = {}, showToast = true, showLoading = true) =>
        request("POST", url, data, showToast, showLoading),

      put: (url: string, data: any = {}, showToast = true, showLoading = true) =>
        request("PUT", url, data, showToast, showLoading),

      delete: (url: string, data: any = {}, showToast = true, showLoading = true) =>
        request("DELETE", url, data, showToast, showLoading),
    };
  }, [navigate]); // <- chỉ tạo lại khi navigate thay đổi

  return { API };
}
