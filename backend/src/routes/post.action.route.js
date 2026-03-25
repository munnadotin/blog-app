import { Router } from 'express';
import { postController } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const actionRoute = Router();

/**
 * @route GET /api/post/user/like
 * @description Get all liked posts by current user
 * @access Private
 */
actionRoute.get("/user/like", authMiddleware, postController.getLikedPosts);

/**
 * @route POST /api/post/:id/like
 * @description Like a post
 * @access Private
 */
actionRoute.post("/:id/like", authMiddleware, postController.likePost);

/**
 * @route POST /api/post/:id/unlike
 * @description Unlike a post
 * @access Private
 */
actionRoute.post("/:id/unlike", authMiddleware, postController.unlikePost);

/**
 * @route POST /api/post/:id/comment
 * @description Comment on a post
 * @access Private
 */
actionRoute.post("/:id/comment", authMiddleware, postController.commentOnPost);

/**
 * @route POST /api/post/:id/comment/:commentId
 * @description Reply to a comment
 * @access Private
 */
actionRoute.post("/:id/comment/:commentId", authMiddleware, postController.replyToComment);

/**
 * @route DELETE /api/post/:id/comment/:commentId
 * @description Delete a comment
 * @access Private
 */
actionRoute.delete("/:id/comment/:commentId", authMiddleware, postController.deleteComment);
