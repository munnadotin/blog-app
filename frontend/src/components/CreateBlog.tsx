import BlogForm from "./BlogForm";
import toast from "react-hot-toast";
import { useCreatePostMutation } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [createPostMutation] = useCreatePostMutation();
  const navigate = useNavigate();

  return (
    <BlogForm
      onSubmit={async (data) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("category", data.category);

        if (data.image?.[0]) {
          formData.append("image", data.image[0]);
        }

        formData.append("tags", JSON.stringify(data.tags));

        await createPostMutation(formData);
        toast.success("Blog Created");
        navigate("/");
      }}
    />
  );
}

export default CreateBlog;