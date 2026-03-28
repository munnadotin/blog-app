import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useGetPostsByUserQuery } from '../services/api';
import Loader from './Loader';
import toast from 'react-hot-toast';

function PostBlog() {
    const { data, isLoading, error } = useGetPostsByUserQuery(undefined);
    const navigate = useNavigate();
    
    if (isLoading) return <Loader />;
    if (error) return toast.error((error as any).data?.message || "Failed to load posts");

    return (
        <Card Posts={data?.posts || []} onRead={(p) => navigate(`/blog/${p.slug}`)} onEdit={(p) => navigate(`/edit/${p.slug}`)} />
    )
}

export default PostBlog