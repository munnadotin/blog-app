import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogForm from "./BlogForm";
import { getPost, updatePost } from "../api/post.api";
import toast from "react-hot-toast";

function EditBlog() {
    const { slug } = useParams();
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        const fetchPost = async () => {
            const res = await getPost(slug!);
            setPost(res.data.post);
        };

        fetchPost();
    }, [slug]);

    if (!post) return <p>Loading...</p>;

    return (
        <BlogForm
            defaultValues={post}
            isEdit
            onSubmit={async (data) => {
                try {
                    const formData = new FormData();

                    formData.append("title", data.title);
                    formData.append("content", data.content);
                    formData.append("category", data.category);

                    if (data.image?.[0]) {
                        formData.append("image", data.image[0]);
                    }

                    formData.append("tags", JSON.stringify(data.tags));

                    console.log("Updating post with ID:", post._id);
                    const response: any = await updatePost(post._id, formData);
                    toast.success(response.data.message);
                } catch (error: any) {
                    console.error("Update error:", error);
                    const errorMessage = error.response?.data?.message || error.message || "Failed to update blog post";
                    toast.error(errorMessage);
                    throw error;
                }
            }}
        />
    );
}

export default EditBlog;