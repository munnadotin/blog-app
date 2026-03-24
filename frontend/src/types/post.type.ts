export interface CreatePost {
    title: string;
    content: string;
    tags: string[];
    image: File;
    category: string;
}

export interface Post extends CreatePost {
    _id: string;
    authorId: {
        name: string;
        email: string;
    };
    category: string;
    slug: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    readingTime: number;
    updatedAt: string;
}

