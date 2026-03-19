export interface CreatePost {
    title: string;
    content: string;
    tags: string[];
    ImageCapture: string;
    slug: string;
    readingTime: number;
}

export interface Post extends CreatePost{
    _id: string;
    authorId: {
        name: string;
        email: string;
    };
    category: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    updatedAt: string;
}
