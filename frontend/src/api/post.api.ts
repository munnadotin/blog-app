import api from "./api";
import type { Post } from "../types/post.type";

// Get all posts
export const getAllPosts = () => api.get<{ posts: Post[] }>("/api/post");

//  Get all posts by user
export const getPostsByUser = () => api.get<{ posts: Post[] }>("/api/post/user-posts");

// Get all liked posts by user
export const getLikedPosts = () => api.get<{ posts: Post[] }>("/api/post/user/like");

// Get post by slug
export const getPost = (slug: string) => api.get<{ post: Post }>(`/api/post/${slug}`);

// Create post
export const createPost = (post: FormData) => api.post<{ message: string; post: Post }>("/api/post/create", post);

// Update post
export const updatePost = (id: string, post: FormData) => api.put<{ post: Post }>(`/api/post/${id}`, post);

// Delete post
export const deletePost = (id: string) => api.delete(`/api/post/${id}`);