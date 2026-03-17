export interface CreatePost {
    title: string;
    content: string;
    tags: string[];
    imageCapture: string;
    slug: string;
    readingTime: number;
}

export interface Post extends CreatePost{
    id: string;
    author: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    updatedAt: string;
}
