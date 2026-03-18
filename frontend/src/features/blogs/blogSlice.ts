import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts } from "../../api/post.api";
import type { Post } from "../../types/post.type";

type BlogState = {
    blogs: Post[];
    loading: boolean;
    error: string | null;
};

export const fetchBlogs = createAsyncThunk(
    "blog/fetchBlogs",
    async () => {
        const response = await getPosts();
        return response.posts;
    }
);

const initialState: BlogState = {
    blogs: [],
    loading: false,
    error: null,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    },
});

export default blogSlice.reducer;