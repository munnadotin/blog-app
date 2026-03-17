import { uploadToImageKit } from "../config/imagekit.js";
import { postModel } from "../models/post.model.js";

/**
 * @description Create a new post
 * @route POST /api/post/create
 * @access private
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

/**
 * @description Update a post
 * @route POST /api/post/:id
 * @access private
 */
export async function updatePost(req, res) {
    try {
        const { title, content, tags } = req.body;
        const image = req.file;
        const { id } = req.params;

        // find the post by id
        const post = await postModel.findById(id);

        // check if post exists
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // only update if the field is provided
        if (title) post.title = title;
        if (content) post.content = content;
        if (tags) post.tags = tags;
        if (image) post.ImageCapture = await uploadToImageKit(image);

        // save the updated post
        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

/**
 * @description Delete a post
 * @route DELETE /api/post/:id
 * @access private
 */
export async function deletePost(req, res) {
    try {
        const { id } = req.params;

        // find the post by id
        const post = await postModel.findById(id);

        // check if post exists
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // delete the post if the author is the same
        await postModel.findByIdAndDelete({ _id: id, authorId: req.user._id });

        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}