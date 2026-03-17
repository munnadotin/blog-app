import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.js";
import { createPost, updatePost, deletePost } from "../controllers/post.controller.js";

export const postRoute = Router();

/**
 * @route POST /api/post/create
 * @description Create a new post
 * @access Private
 */
postRoute.post("/create", upload.single("image"), authMiddleware, createPost);

/**
 * @route PUT /api/post/:id
 * @description Update a post
 * @access Private
 */
postRoute.put("/:id", upload.single("image"), authMiddleware, updatePost);

/**
 * @route DELETE /api/post/:id
 * @description Delete a post
 * @access Private
 */
postRoute.delete("/:id", authMiddleware, deletePost);
