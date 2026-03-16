import { uploadToImageKit } from "../config/imagekit.js";
import { postModel } from "../models/post.model.js";

/**
 * @description Upload an image to ImageKit
 */
export async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "File not found" });
        }
        const result = await uploadToImageKit(req.file);

        res.json({
            result
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

/**
 * @description Create a new post
 * @route POST /api/post/create
 * @access Private
 */
export async function createPost(req, res) {
    try {
        const { title, content, tags } = req.body;
        
        if (!title || !content || !tags) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const image = await uploadToImageKit(req.file);
        const readingTime = Math.ceil(content.split(" ").length / 200);

        const post = await postModel.create({
            title: title,
            content,
            ImageCapture: image,
            tags,
            readingTime,
            authorId: req.user.id,
            slug: title.toLowerCase().replace(/ /g, "-")
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}   
