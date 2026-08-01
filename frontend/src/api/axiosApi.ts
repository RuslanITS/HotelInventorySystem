import axios from "axios";

interface ApiErrorResponse {
  message?: string;
}

const axiosApi = axios.create({
  baseURL: "http://localhost:8000",
});

export default axiosApi;

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data.message ?? fallback;
  }

  return fallback;
};
