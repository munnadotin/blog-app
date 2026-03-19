import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, login, refreshToken, register } from "../../api/auth.api";
import type { LoginData, RegisterData } from "../../types/auth.type";

export const userProfile = createAsyncThunk(
    "/ auth / profile",
    async () => {
        const response = await getProfile();
        return response;
    });

export const refreshTokenUser = createAsyncThunk(
    "/auth/refresh-token",
    async () => {
        const response = await refreshToken();
        return response;
    });

export const loginUser = createAsyncThunk(
    "/auth/login",
    async (data: LoginData) => {
        const response = await login(data);
        console.log(response)
        return response;
    });

export const registerUser = createAsyncThunk(
    "/auth/register",
    async (data: RegisterData) => {
        const response = await register(data);
        return response;
    });

const initialState = {
    user: {
        _id: "",
        name: "",
        email: ""
    },
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;