import { useEffect, useState } from 'react'
import Card from './Card'
import type { Post } from '../types/post.type';
import { getLikedPosts } from '../api/post.api';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

function LikeBlog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (posts.length > 0) return;

        async function getPosts() {
            try {
                setLoading(true);
                const res = await getLikedPosts();
                setPosts(res.data.posts);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getPosts();
    }, []);

    if (loading) return <Loader />;

    return (
        <Card Posts={posts} onRead={(p) => navigate(`blog/${p.slug}`)} onEdit={() => { }} />
    )
}

export default LikeBlog