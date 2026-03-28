import Card from './Card'
import toast from 'react-hot-toast';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useGetLikedPostsQuery } from '../services/api';

function LikeBlog() {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetLikedPostsQuery(undefined);
    
    if (isLoading) return <Loader />;
    if (error) return toast.error((error as any)?.message || 'Failed to load liked posts');

    return (
        <Card Posts={data?.posts || []} onRead={(p) => navigate(`/blog/${p.slug}`)} />
    )
}

export default LikeBlog