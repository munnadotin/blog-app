import { useEffect, useState } from 'react'
import type { Post } from '../types/post.type';
import { getPostsByUser } from '../api/post.api';
import toast from 'react-hot-toast';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function PostBlog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (posts.length > 0) return;

        const fetchPosts = async () => {
            try {
                const res = await getPostsByUser();
                setPosts(res.data.posts);
            } catch (err: any) {
                toast.error(err.message);
            }
        };

        fetchPosts();
    }, [])
    return (
        <Card Posts={posts} onRead={(p) => navigate(`/blog/${p.slug}`)} onEdit={(p) => navigate(`/edit/${p.slug}`)} />
    )
}

export default PostBlog