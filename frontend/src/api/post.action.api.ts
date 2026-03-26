import api from "./api";

// Like or dislike post
export const likePost = (id: string) => (api.post(`/api/post/${id}/like`));

// Comment post
export const commentPost = (id: string, text: string) => (api.post(`/api/post/${id}/comment`, { text }));

// reply on comment
export const replyComment = (id: string, commentId: string, text: string) => (api.post(`/api/post/${id}/comment/${commentId}`, { text }));

// Delete comment
export const deleteComment = (id: string, commentId: string) => (api.delete(`/api/post/${id}/comment/${commentId}`));