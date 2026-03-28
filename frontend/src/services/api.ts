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
            query: () => `/api/post`,
            providesTags: ["Posts"],
        }),

        // Get post by slug
        getPostbySlug: builder.query({
            query: (slug) => `/api/post/${slug}`,
            providesTags: ["Posts"],
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
        })
    }),
});

export const { useGetPostsQuery, useGetPostbySlugQuery, useAddLikeMutation, useAddCommentMutation, useDeleteCommentMutation, useGetPostsByUserQuery, useGetLikedPostsQuery } = api; 