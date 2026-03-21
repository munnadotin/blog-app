import api from "./api";
import type { LoginData, RegisterData } from "../types/auth.type";

// Register
export const register = (data: RegisterData) => api.post("/api/auth/register", data);

// Login
export const login = (data: LoginData) => api.post("/api/auth/login", data);

// Logout
export const logout = () => api.post("/api/auth/logout");

// Get profile
export const getProfile = () => api.get("/api/auth/profile");

// Refresh token
export const refreshToken = () => api.post("/api/auth/refresh-token");