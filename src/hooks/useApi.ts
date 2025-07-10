import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { API_URL,API_URL_AI } from "@/utils/URLMapping";

export function useAPI() {
  const navigate = useNavigate();

  const API = useMemo(() => {
    const request = async (
      method: string,
      url: string,
      data: any = {},
      port :string
    ): Promise<any> => {
      url = url.startsWith("/") ? url.slice(1) : url;

      const token = localStorage.getItem("token");

      const headers: Record<string, string> = {
        ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      try {
        const options: RequestInit = {
          method,
          headers,
        };

        if (method !== "GET" && method !== "DELETE") {
          options.body = data instanceof FormData ? data : JSON.stringify(data);
        }

        const response = await fetch(port + `/${url}`, options);

        if (!response.ok) {
          return handleErrorResponse(response);
        }

        const responseData = await response.json();
        responseData.success = true;
        return responseData;
      } catch (error) {
        return handleErrorResponse(error);
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

        if (status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
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
      get: (url: string,port: string = API_URL) =>
        request("GET", url, {}, port),

      post: (url: string, data: any = {},port: string = API_URL) =>
        request("POST", url, data, port),

      put: (url: string, data: any = {},port: string = API_URL) =>
        request("PUT", url, data,port),

      delete: (url: string, data: any = {}, port: string = API_URL) =>
        request("DELETE", url, data,port),
    };
  }, [navigate]);

  return { API };
}
