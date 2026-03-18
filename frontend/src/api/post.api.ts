import api from "./api";
import type { Post, CreatePost } from "../types/post.type";
import { apiHandler } from "../utils/apiHandler";

// Get all posts
export const getPosts = () => apiHandler(api.get<{ posts: Post[] }>("/api/post"));

// Get post by id
export const getPost = (id: string) => apiHandler(api.get<Post>(`/api/post/${id}`));

// Create post
export const createPost = (post: CreatePost) => apiHandler(api.post<Post>("/api/post", post));

// Update post
export const updatePost = (id: string, post: CreatePost) => apiHandler(api.put<Post>(`/api/post/${id}`, post));

// Delete post
export const deletePost = (id: string) => apiHandler(api.delete(`/api/post/${id}`));