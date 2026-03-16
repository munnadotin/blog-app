import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.js";
import { uploadImage } from "../controllers/post.controller.js";

export const postRoute = Router();

postRoute.post("/upload", upload.single("image"), authMiddleware, uploadImage); 