import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useDeletePostMutation, useGetPostsByUserQuery } from '../services/api';
import Loader from './Loader';
import toast from 'react-hot-toast';

function PostBlog() {
    const { data, isLoading, error } = useGetPostsByUserQuery(undefined);
    const [deletePost] = useDeletePostMutation();
    const navigate = useNavigate();

    async function handleDelete(postId: string) {
        try {
            const res = await deletePost(postId).unwrap();
            toast.success(res.message);
        } catch (error) {
            toast.error((error as any).data?.message || "Failed to delete post");
        }
    }

    if (isLoading) return <Loader />;
    if (error) return toast.error((error as any).data?.message || "Failed to load posts");

    return (
        <Card Posts={data?.posts || []} onDelete={(p) => handleDelete(p._id)} onEdit={(p) => navigate(`/edit/${p.slug}`)} />
    )
}

export default PostBlog