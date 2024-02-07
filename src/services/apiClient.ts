import axios, { CanceledError } from "axios";

export { CanceledError };

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.error("No refresh token found");
    throw new Error("Login required");
  }
  try {
    const response = await apiClient.post(
      `/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `JWT ${refreshToken}`,
        },
      }
    );
    const { accessToken, refreshToken: newRefreshToken } = response.data; // שימו לב לשינוי כאן
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken); // תיקון: עדכון המפתח הנכון

    apiClient.defaults.headers.common["Authorization"] = `JWT ${accessToken}`;
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token", error);
    throw new Error("Failed to refresh token");
  }
}

// Interceptor לבקשות - ודא שה-token תמיד עדכני
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers["Authorization"] = `JWT ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

let isRefreshing = false; // דגל לסימון שתהליך ריענון מתבצע

// Interceptor לתגובות
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true; // סימון שתהליך ריענון התחיל
      try {
        const accessToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = "JWT " + accessToken;
        isRefreshing = false; // סימון שתהליך ריענון הסתיים
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false; // סימון שתהליך ריענון הסתיים בשגיאה
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
