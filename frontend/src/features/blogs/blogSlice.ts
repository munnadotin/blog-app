import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, getPost } from "../../api/post.api";
import type { Post } from "../../types/post.type";

type BlogState = {
    blogs: Post[];
    loading: boolean;
    error: string | null;
    post: Post | null;
};

export const fetchBlogs = createAsyncThunk(
    "blog/fetchBlogs",
    async () => {
        const response = await getPosts();
        return response.posts;
    }
);

export const getPostApi = createAsyncThunk<Post, string>(
    "blog/getPost",
    async (slug: string) => {
        const response = await getPost(slug);
        return response.post;
    }
);

const initialState: BlogState = {
    blogs: [],
    loading: false,
    error: null,
    post: null,
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
            })
            .addCase(getPostApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostApi.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
            })
            .addCase(getPostApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    },
});

export default blogSlice.reducer;