import api from "./api";
import type { LoginData, RegisterData } from "../types/auth.type";
import { apiHandler } from "../utils/apiHandler";

// Register
export const register = (data: RegisterData) => apiHandler(api.post("/auth/register", data));

// Login
export const login = (data: LoginData) => apiHandler(api.post("/auth/login", data));

// Logout
export const logout = () => apiHandler(api.post("/auth/logout"));

// Get profile
export const getProfile = () => apiHandler(api.get("/auth/profile"));

// Refresh token
export const refreshToken = () => apiHandler(api.post("/auth/refresh-token"));