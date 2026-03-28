import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Loader2, Plus, Trash } from "lucide-react";
import type { Post } from "../types/post.type";

type BlogFormProps = {
  defaultValues?: Post;
  onSubmit: (data: any) => Promise<void>;
  isEdit?: boolean;
};

function BlogForm({ defaultValues, onSubmit, isEdit }: BlogFormProps) {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      tags: [""],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  } as any);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      if (defaultValues.ImageCapture) {
        setImagePreview(defaultValues.ImageCapture);
      }
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error: any) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl border-2 rounded-lg bg-white border-slate-200 shadow-md p-8">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isEdit ? "Edit Blog" : "Create New Blog"}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title..."
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-700 outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              rows={5}
              placeholder="Write your blog content..."
              {...register("content", { required: "Content is required" })}
              className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-700 outline-none resize-none"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>

            {fields.map((item, index) => (
              <div key={item.id} className="flex gap-2 mb-2">
                <input
                  type="text"
                  {...register(`tags.${index}`)}
                  placeholder="Enter tag"
                  className="w-full px-4 py-2 border border-blue-400 rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-2 bg-red-500 text-white rounded cursor-pointer"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append("")}
              className="mt-2 px-2 py-1 bg-blue-500 text-white rounded flex items-center gap-1 cursor-pointer"
            >
              <Plus className="h-5 w-5" /> Add Tag
            </button>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-700 outline-none bg-transparent"
            >
              <option value="">Select category</option>
              <option value="technology">Technology</option>
              <option value="carrer">Career</option>
              <option value="finance">Finance</option>
              <option value="health">Health</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Thumbnail
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              className="w-full text-sm border border-blue-600 rounded-lg p-2 cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-500 file:text-white hover:file:bg-blue-700"
            />

            {/* Preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-56 object-cover rounded-lg border-2 border-slate-200"
                />
              </div>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition duration-200 cursor-pointer flex items-center justify-center"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : isEdit ? (
              "Update Blog"
            ) : (
              "Publish Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;