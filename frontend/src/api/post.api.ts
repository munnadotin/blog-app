import api from "./api";
import type { Post, CreatePost } from "../types/post.type";
import { apiHandler } from "../utils/apiHandler";

// Get all posts
export const getPosts = () => apiHandler(api.get<{ posts: Post[] }>("/api/post"));

// Get post by slug
export const getPost = (slug: string) => apiHandler(api.get<{ post: Post }>(`/api/post/${slug}`));

// Create post
export const createPost = (post: CreatePost) => apiHandler(api.post<{ post: Post }>("/api/post", post));

// Update post
export const updatePost = (id: string, post: CreatePost) => apiHandler(api.put<{ post: Post }>(`/api/post/${id}`, post));

// Delete post
export const deletePost = (id: string) => apiHandler(api.delete(`/api/post/${id}`));