import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Post } from "../../types/post.type";
import { getAllPosts, getPost } from "../../api/post.api";

interface blogState {
    blogs: Post[],
    error: string | null,
    loading: boolean,
    blog: Post | null
}

export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async (_, { rejectWithValue }) => {
    try {
        const response = await getAllPosts();
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch blogs")
    }
});

export const fetchBlogBySlug = createAsyncThunk("blogs/fetchBlogBySlug", async (id: string, { rejectWithValue }) => {
    try {
        const response = await getPost(id)
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch blog")
    }
})

const initialState: blogState = {
    blogs: [],
    error: null,
    loading: false,
    blog: null
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch all blogs
        builder.addCase(fetchBlogs.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = action.payload.posts as Post[];
        });
        builder.addCase(fetchBlogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Fetch blog by slug
        builder.addCase(fetchBlogBySlug.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBlogBySlug.fulfilled, (state, action) => {
            state.loading = false;
            state.blog = action.payload.post as Post;
        });
        builder.addCase(fetchBlogBySlug.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export default blogSlice.reducer; 