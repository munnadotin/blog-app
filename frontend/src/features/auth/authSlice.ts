import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { LoginData, RegisterData, User } from "../../types/auth.type";
import { loginApi, refreshTokenApi, registerApi, logoutApi } from "../../api/auth.api";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    error: string | null;
    loading: boolean;
}
interface AuthRespnose {
    user: User;
    accessToken: string;
}
export const login = createAsyncThunk<AuthRespnose, LoginData, { rejectValue: string }>("auth/login", async (data: LoginData, { rejectWithValue }) => {
    try {
        const response = await loginApi(data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || "Login failed");
    }
});

export const register = createAsyncThunk("auth/register", async (data: RegisterData, { rejectWithValue }) => {
    try {
        const response = await registerApi(data);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || "Registration failed");
    }
});

export const refreshToken = createAsyncThunk<
    AuthRespnose,
    void,
    { rejectValue: string }
>(
    "auth/refresh-token",
    async (_, { rejectWithValue }) => {
        try {
            const response = await refreshTokenApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Refresh token failed"
            );
        }
    }
);

export const logOut = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const response = await logoutApi();
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data.message || "Logout failed");
    }
});

const initialState: AuthState = {
    user: null,
    accessToken: null,
    error: null,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.error = null;
                state.loading = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.accessToken = action.payload.data.accessToken;
                state.error = null;
                state.loading = false;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
            })

            .addCase(refreshToken.rejected, (state) => {
                state.user = null;
                state.accessToken = null;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
            })
    }
})

export default authSlice.reducer;