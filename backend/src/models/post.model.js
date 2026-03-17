import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Author is required"],
    },
    tags: [{
        type: String,
        required: [true, "Tags are required"],
    }],
    ImageCapture: {
        type: String,
        required: [true, "Cover image is required"],
    },
    slug: {
        type: String,
        unique: true
    },
    readingTime: {
        type: Number,
        required: [true, "Reading time is required"],
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        text: String,
        createdAt: { type: Date, default: Date.now },
        
        replies: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
            text: String,
            createdAt: { type: Date, default: Date.now }
        }]
    }],
}, {
    timestamps: true
});

export const postModel = mongoose.model("post", postSchema); 