export interface CreatePost {
    title: string;
    content: string;
    tags: string[];
    image: FileList;
    category: string;
}

export interface Post extends CreatePost {
    _id: string;
    authorId: {
        name: string;
        email: string;
    };
    ImageCapture: string;
    category: string;
    slug: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    readingTime: number;
    updatedAt: string;
}

export interface CreatePostResponse {
    message: string;
    post: Post;
}

