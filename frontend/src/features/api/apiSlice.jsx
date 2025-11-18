import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Token store - will be updated by ClerkAuthProvider component
let clerkToken = null;

export const setClerkToken = (token) => {
  clerkToken = token;
};

export const getClerkToken = () => clerkToken;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = getClerkToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Posts"]
    }),
    createPost: builder.mutation({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["Posts"]
    })
  })
});

export const { useGetPostsQuery, useCreatePostMutation } = apiSlice;
