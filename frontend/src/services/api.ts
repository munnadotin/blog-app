import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state?.auth?.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
        credentials: 'include',
    }),

    tagTypes: ["Posts"],

    endpoints: (builder) => ({
        // Get all posts
        getPosts: builder.query({
            query: ({ category, search, page = 1, limit = 9 }) => {
                const params = new URLSearchParams();
                if (category) params.append('category', category);
                if (search) params.append('search', search);
                params.append('page', page.toString());
                params.append('limit', limit.toString());

                const queryString = params.toString();
                return `/api/post${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ["Posts"]
        }),

        // Get post by slug
        getPostbySlug: builder.query({
            query: (slug) => `/api/post/${slug}`,
            providesTags: ["Posts"],
        }),

        // create post
        createPost: builder.mutation({
            query: (data) => ({
                url: `/api/post/create`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Posts"],
        }),

        // update post
        updatePost: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/api/post/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["Posts"],
        }),

        // Add like to post
        addLike: builder.mutation({
            query: (postId) => ({
                url: `/api/post/${postId}/like`,
                method: "POST",
            }),
            invalidatesTags: ["Posts"],
        }),

        // Add comment to post
        addComment: builder.mutation({
            query: ({ postId, text }) => ({
                url: `/api/post/${postId}/comment`,
                method: "POST",
                body: { text },
            }),
            invalidatesTags: ["Posts"],
        }),

        // Delete comment 
        deleteComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `/api/post/${postId}/comment/${commentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Posts"],
        }),

        // Get all posts by user
        getPostsByUser: builder.query({
            query: () => `/api/post/user-posts`,
            providesTags: ["Posts"]
        }),

        // Get all like posts by user
        getLikedPosts: builder.query({
            query: () => `/api/post/user/like`,
            providesTags: ["Posts"],
        }),

        // Delete post
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/api/post/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Posts"],
        }),
    }),
});

export const { useGetPostsQuery, useGetPostbySlugQuery, useCreatePostMutation, useAddLikeMutation, useAddCommentMutation, useDeleteCommentMutation, useGetPostsByUserQuery, useGetLikedPostsQuery, useDeletePostMutation, useUpdatePostMutation } = api; 