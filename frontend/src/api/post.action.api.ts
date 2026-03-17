import api from "./api";
import { apiHandler } from "../utils/apiHandler";

// Like post
export const likePost = (id: string) => apiHandler(api.post(`/api/post/${id}/like`));

// Unlike post
export const unlikePost = (id: string) => apiHandler(api.delete(`/api/post/${id}/like`));

// Comment post
export const commentPost = (id: string, text: string) => apiHandler(api.post(`/api/post/${id}/comment`, { text }));

// reply on comment
export const replyComment = (id: string, commentId: string, text: string) => apiHandler(api.post(`/api/post/${id}/comment/${commentId}`, { text }));

// Delete comment
export const deleteComment = (id: string, commentId: string) => apiHandler(api.delete(`/api/post/${id}/comment/${commentId}`));