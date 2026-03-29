import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "./BlogForm";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { useGetPostbySlugQuery, useUpdatePostMutation } from "../services/api";

function EditBlog() {
    const { slug } = useParams();
    const { data: postData, isLoading, error } = useGetPostbySlugQuery(slug);
    const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
    const naviate = useNavigate();

    if (isLoading) return <Loader />;
    if (isUpdating) return <Loader />;
    if (error) return toast.error((error as any).message);

    return (
        <div className="py-8">
            <BlogForm
                defaultValues={{
                    ...postData?.post,
                    tags:
                        typeof postData?.post?.tags === "string"
                            ? JSON.parse(postData.post.tags)
                            : postData?.post?.tags,
                }} isEdit
                onSubmit={async (formDataValues) => {
                    try {
                        const formData = new FormData();

                        formData.append("title", formDataValues.title);
                        formData.append("content", formDataValues.content);
                        formData.append("category", formDataValues.category);

                        if (formDataValues.image?.[0]) {
                            formData.append("image", formDataValues.image[0]);
                        }

                        formData.append("tags", JSON.stringify(formDataValues.tags));

                        const response: any = await updatePost({
                            id: postData?.post._id,
                            data: formData
                        }).unwrap();

                        toast.success(response.message);
                        naviate("/");
                    } catch (error: any) {
                        console.error("Update error:", error);
                        const errorMessage =
                            error.data?.message || error.message || "Failed to update blog post";
                        toast.error(errorMessage);
                        throw error;
                    }
                }}
            />
        </div>
    );
}

export default EditBlog;