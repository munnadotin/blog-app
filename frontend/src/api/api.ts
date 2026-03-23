import axios from "axios";
import { store } from "../app/store";
import { logOut, refreshToken } from "../features/auth/authSlice";

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
api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;

    // token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            // refresh token
            const response = await store.dispatch(refreshToken()).unwrap();
            const { accessToken } = response;

            // attach new token to request
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
        } catch (err) {
            // redirect to login page
            store.dispatch(logOut());
            return Promise.reject(err);
        }
    }
    return Promise.reject(error);
}); 

export default api;