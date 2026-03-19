import { uploadToImageKit } from "../config/imagekit.js";
import { postModel } from "../models/post.model.js";
import { generateUniqueSlug } from "../services/slug.service.js";

/**
 * @description Create a new post
 * @route POST /api/post/create
 * @access private
 */
async function createPost(req, res) {
    try {
        const { title, content, tags, category } = req.body;

        if (!title || !content || !tags || !category) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if(typeof tags === "string"){
            tags = tags.split(",").map(tag => tag.trim());
        }

        const image = await uploadToImageKit(req.file);
        const readingTime = Math.ceil(content.split(" ").length / 200);
        const slug = await generateUniqueSlug(title);

        const post = await postModel.create({
            title: title,
            content,
            ImageCapture: image,
            tags,
            category,
            readingTime,
            authorId: req.user.id,
            slug
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
async function updatePost(req, res) {
    try {
        const { title, content, tags, category } = req.body;
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
        if (category) post.category = category;
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
async function deletePost(req, res) {
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

/**
 * @description Get a post by slug
 * @route GET /api/post/:slug
 * @access public
 */
async function getPost(req, res) {
    try {
        const { slug } = req.params;   

        // find post by slug
        const post = await postModel.findOne({ slug }).populate("authorId", "name email");

        // check if post exist
        if (!post) {
            return res.status(400).json({
                message: "Post not found"
            })
        }

        res.status(200).json({
            message: "Post fetched successfully",
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
 * @description Get all posts
 * @route GET /api/post
 * @access public
 */
async function getAllPosts(req, res) {
    try {
        const posts = await postModel.find().populate("authorId", "name email");

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                message: "No posts found"
            });
        }

        res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

/**
 * @description Like a post
 * @route POST /api/post/:id/like
 * @access private
 */
async function likePost(req, res) {
    try {
        const { id } = req.params;

        // find post by id
        const post = await postModel.findById(id);

        // check if post exist
        if (!post) {
            return res.status(400).json({
                message: "Post not found"
            })
        }

        // check if user already liked the post
        const isLiked = post.likes.includes(req.user.id);

        if (isLiked) {
            return res.status(400).json({
                message: "Post already liked"
            });
        }

        // add user to likes array
        post.likes.push(req.user.id);
        await post.save();

        res.status(200).json({
            message: "Post liked successfully",
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
 * @description Unlike a post
 * @route POST /api/post/:id/unlike
 * @access private
 */

async function unlikePost(req, res) {
    try {
        const { id } = req.params;

        const post = await postModel.findById(id);

        // check post exist
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        // check if user already liked the post
        const isLiked = post.likes.includes(req.user.id);

        if (!isLiked) {
            return res.status(400).json({
                message: "Post not liked"
            });
        }

        // remove user from likes array
        post.likes = post.likes.filter(like => !like.equals(req.user.id));
        await post.save();

        res.status(200).json({
            message: "Post unliked successfully",
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
 * @description Comment on a post
 * @route POST /api/post/:id/comment
 * @access private
 */
async function commentOnPost(req, res) {
    try {
        const { id } = req.params;
        const { text } = req.body;

        // find post by id
        const post = await postModel.findById(id);

        // if post exits
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // add comment to post
        post.comments.push({
            user: req.user.id,
            text
        })

        await post.save();

        res.status(200).json({
            message: "Comment added successfully",
            post
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

/**
 * @description Reply to a comment
 * @route POST /api/post/:id/comment/:commentId
 * @access private
 */
async function replyToComment(req, res) {
    try {
        const { id, commentId } = req.params;
        const { text } = req.body;

        // find post by id
        const post = await postModel.findById(id);

        // if post exits
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // find comment by id
        const comment = post.comments.id(commentId);

        // if comment exits
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // add reply to comment
        comment.replies.push({
            user: req.user.id,
            text
        });

        await post.save();

        res.status(200).json({
            message: "Reply added successfully",
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
 * @description Delete a comment
 * @route DELETE /api/post/:id/comment/:commentId
 * @access private
 */
async function deleteComment(req, res) {
    try {
        const { id, commentId } = req.params;

        // find post by id
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // find comment by id
        const comment = post.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // delete comment
        comment.deleteOne();

        await post.save();

        res.status(200).json({
            message: "Comment deleted successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const postController = {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPosts,
    likePost,
    unlikePost,
    commentOnPost,
    replyToComment,
    deleteComment
};