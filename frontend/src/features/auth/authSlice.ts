import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, login, logout as logoutApi, refreshToken, register } from "../../api/auth.api";
import type { LoginData, RegisterData, LoginResponse, RefreshTokenResponse, User } from "../../types/auth.type";

// Load initial state from localStorage
const loadUserFromStorage = (): User => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { id: "", name: "", email: "" };
};

const loadTokenFromStorage = (): string | null => {
    return localStorage.getItem('accessToken');
};

type AuthState = {
    user: User;
    accessToken: string | null;
}

export const logoutUser = createAsyncThunk(
    "/auth/logout",
    async () => {
        await logoutApi();
        return null;
    });

export const userProfile = createAsyncThunk(
    "/auth/profile",
    async () => {
        const response = await getProfile();
        return response;
    });

export const refreshTokenUser = createAsyncThunk<RefreshTokenResponse>(
    "/auth/refresh-token",
    async () => {
        const response = await refreshToken();
        return response as RefreshTokenResponse;
    });

export const loginUser = createAsyncThunk<LoginResponse, LoginData>(
    "/auth/login",
    async (data: LoginData) => {
        const response = await login(data);
        return response as LoginResponse;
    });

export const registerUser = createAsyncThunk<LoginResponse, RegisterData>(
    "/auth/register",
    async (data: RegisterData) => {
        const response = await register(data);
        return response as LoginResponse;
    });

const initialState: AuthState = {
    user: loadUserFromStorage(),
    accessToken: loadTokenFromStorage(),
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setToken: (state, action) => {
            state.accessToken = action.payload;
            if (action.payload) {
                localStorage.setItem('accessToken', action.payload);
            } else {
                localStorage.removeItem('accessToken');
            }
        },
        logout: (state) => {
            state.user = {id: "", name: "", email: "" };
            state.accessToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('accessToken', action.payload.accessToken);
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = { id: "", name: "", email: "" };
            state.accessToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
        });
        builder.addCase(refreshTokenUser.fulfilled, (state, action) => {
            if (action.payload?.accessToken) {
                state.accessToken = action.payload.accessToken;
                localStorage.setItem('accessToken', action.payload.accessToken);
            }
        });
    },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;