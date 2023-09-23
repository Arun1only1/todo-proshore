import axios from "axios";

const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 2000,
});

$axios.interceptors.request.use(function (config) {
  // extract accesstoken from local storage
  const accesstoken = localStorage.getItem("accesstoken");

  // if token, set it to every request
  if (accesstoken) {
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }

  return config;
});

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration and refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshtoken");

        const res = await axios.post(
          "http://localhost:8000/refresh-token/new-token",
          {
            refreshToken,
          }
        );
        const accessToken = res?.data?.token?.accessToken;
        localStorage.setItem("accesstoken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return $axios(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default $axios;
