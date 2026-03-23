import axios from "axios";
import { store } from "../app/store";
import { logOut, refreshToken } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// token attach automatically
api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// response interceptor 
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isRefreshCall = originalRequest.url?.includes("/api/auth/refresh-token");

        // avoid infinite loop
        if (isRefreshCall) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await store.dispatch(refreshToken()).unwrap();
                const { accessToken } = response;

                // update token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // retry using SAME axios instance
                return api(originalRequest);

            } catch (err) {
                store.dispatch(logOut());
                Navigate({ to: "/auth/login" });
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;