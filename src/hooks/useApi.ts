import { API_URL } from "@/utils/URLMapping";
import { useNavigate } from "react-router-dom";

export function useAPI() {
  const navigate = useNavigate();

  const request = async (
    method: string,
    url: string,
    data: any = {},
    showToast: boolean = false,
    showLoadingUI: boolean = true
  ): Promise<any> => {
    url = url.startsWith("/") ? url.slice(1) : url;
    // const token = localStorage.get("token");

    const headers: any = {
      ...(!(data instanceof FormData) && { 'Content-Type': 'application/json' }),
      // ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
      if (showLoadingUI) {
      }

      const options: RequestInit = {
        method,
        headers
      };

      // Chỉ thêm body nếu không phải GET hoặc DELETE
      if (method !== 'GET' && method !== 'DELETE') {
        options.body = data instanceof FormData ? data : JSON.stringify(data);
      }

      const response = await fetch(`${API_URL}/api/${url}`, options);

      if (!response.ok) {
        return handleErrorResponse(response, showToast);
      }

      const responseData = await response.json();

      if (showToast) {
        // notification.success({
        //   message: "Success",
        //   description: responseData.message || "Success",
        // });
      }

      responseData.success = true;
      return responseData;
    } catch (error) {
      return handleErrorResponse(error, showToast);
    } finally {
      if (showLoadingUI) {
      }
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
          message = "";
          navigate("/login");
          break;
        case 403:
          message = "";
          // router.push("./dashboard");
          break;
        case 404:
          message = "";
          break;
        case 500:
          message = "";
          break;
      }

      if (showToast) {
        // notification.error({
        //   message: "Error",
        //   description: message,
        // });
      }

      responseData.success = false;
      responseData.message = message;
      responseData.status = status;
      return responseData;
    } catch (err) {
      // console.error("Error handling response:", err);
      return { success: false, message: "Disconnected" };
    }
  };

  const API = {
    get: (
      url: string,
      showToast: boolean = true,
      showLoading: boolean = true
    ): Promise<any> => request('GET', url, {}, showToast, showLoading),

    post: (
      url: string,
      data: any = {},
      showToast: boolean = true,
      showLoading: boolean = true
    ): Promise<any> => request('POST', url, data, showToast, showLoading),

    put: (
      url: string,
      data: any = {},
      showToast: boolean = true,
      showLoading: boolean = true
    ): Promise<any> => request('PUT', url, data, showToast, showLoading),

    delete: (
      url: string,
      data: any = {},
      showToast: boolean = true,
      showLoading: boolean = true
    ): Promise<any> => request('DELETE', url, data, showToast, showLoading),
  };

  return { API };
}