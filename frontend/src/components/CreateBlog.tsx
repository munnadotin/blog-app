import BlogForm from "./BlogForm";
import { createPost } from "../api/post.api";
import toast from "react-hot-toast";

function CreateBlog() {
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

        await createPost(formData);
        toast.success("Blog Created");
      }}
    />
  );
}

export default CreateBlog;