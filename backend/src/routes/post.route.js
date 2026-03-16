import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.js";
import { uploadImage, createPost } from "../controllers/post.controller.js";

export const postRoute = Router();

/**
 * @route POST /api/post/upload
 * @description Upload an image for a post
 * @access Private
 */
postRoute.post("/upload", upload.single("image"), authMiddleware, uploadImage); 

/**
 * @route POST /api/post/create
 * @description Create a new post
 * @access Private
 */
postRoute.post("/create", upload.single("image"), authMiddleware, createPost); 
