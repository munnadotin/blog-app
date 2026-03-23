import api from "./api";
import type { LoginData, RegisterData } from "../types/auth.type";

// Register
export const registerApi = (data: RegisterData) => api.post("/api/auth/register", data);

// Login
export const loginApi = (data: LoginData) => api.post("/api/auth/login", data);

// Logout
export const logoutApi = () => api.post("/api/auth/logout");

// Get profile
export const getProfileApi = () => api.get("/api/auth/profile");

// Refresh token
export const refreshTokenApi = () => api.post("/api/auth/refresh-token");