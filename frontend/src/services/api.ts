import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
        credentials: 'include',
    }),

    tagTypes: ["Posts"],

    endpoints: (builder) => ({

        getPosts: builder.query({
            query: () => `/api/post`,
            providesTags: ["Posts"],
        }),

        getPostbySlug: builder.query({
            query: (slug) => `/api/post/${slug}`,
            providesTags: ["Posts"],
        }),

        addLike: builder.mutation({
            query: (postId) => ({
                url: `/api/post/${postId}/like`,
                method: "POST",
            }),
            invalidatesTags: ["Posts"],
        }),

    }),
});

export const { useGetPostsQuery, useGetPostbySlugQuery, useAddLikeMutation } = api; 