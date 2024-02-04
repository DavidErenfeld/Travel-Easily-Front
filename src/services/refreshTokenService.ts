import apiClient from "./apiClient";

interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
}

// הגדרת ה-interceptor
apiClient.interceptors.response.use(
  (response) => response, // מחזיר את התגובה אם הכל תקין
  async (error: any) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // מניעת לולאות אינסופיות
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const response = await apiClient.post<TokenResponse>("/auth/refresh", {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("token", accessToken); // עדכון ה-access token
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken); // עדכון ה-refresh token, אם קיבלת חדש
        }

        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return apiClient(originalRequest); // שליחת הבקשה המקורית שוב עם ה-token החדש
      } catch (refreshError) {
        console.error("Could not refresh access token", refreshError);
        // אולי תרצה לנקוט בפעולות נוספות כאן, כמו להוציא את המשתמש לדף ההתחברות
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
