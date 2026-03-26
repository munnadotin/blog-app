import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    tagTypes: ["Posts"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => `${import.meta.env.VITE_API_BASE_URL}/api/post`,
            providesTags: ['Posts'],
        }),
        getPostbySlug: builder.query({
            query: (slug) => `${import.meta.env.VITE_API_BASE_URL}/api/post/${slug}`,
            providesTags: ['Posts'],
        })
    })
})

export const { useGetPostsQuery, useGetPostbySlugQuery } = api; 