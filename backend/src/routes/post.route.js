import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.js";
import { postController } from "../controllers/post.controller.js";

export const postRoute = Router();

/**
 * @route POST /api/post/create
 * @description Create a new post
 * @access private
 */
postRoute.post("/create", upload.single("image"), authMiddleware, postController.createPost);

/**
 * @route PUT /api/post/:id
 * @description Update a post
 * @access private
 */
postRoute.put("/:id", upload.single("image"), authMiddleware, postController.updatePost);

/**
 * @route DELETE /api/post/:id
 * @description Delete a post
 * @access private
 */
postRoute.delete("/:id", authMiddleware, postController.deletePost);

/**
 * @route GET /api/post/user-posts
 * @description Get all posts by user
 * @access private
 */
postRoute.get("/user-posts", authMiddleware, postController.getPostsByUser);

/**
 * @route GET /api/post/:slug
 * @description Get a post by slug
 * @access public
 */
postRoute.get("/:slug", postController.getPost);

/**
 * @route GET /api/post
 * @description Get all posts
 * @access public
 */
postRoute.get("/", postController.getAllPosts);
