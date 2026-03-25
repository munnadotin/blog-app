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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">

      {/* Title */}
      <input
        {...register("title", { required: "Title is required" })}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      {/* Content */}
      <textarea
        {...register("content", { required: "Content is required" })}
        placeholder="Content"
        className="w-full border p-2 rounded"
      />
      {errors.content && <p className="text-red-500">{errors.content.message}</p>}

      {/* Tags */}
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-2">
          <input
            {...register(`tags.${index}`)}
            className="border p-2 w-full"
          />
          <button type="button" onClick={() => remove(index)}>
            <Trash />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append("")}>
        <Plus /> Add Tag
      </button>

      {/* Category */}
      <select {...register("category")} className="border p-2 w-full">
        <option value="">Select</option>
        <option value="technology">Technology</option>
        <option value="career">Career</option>
      </select>

      {/* Image */}
      <input type="file" {...register("image")} onChange={handleImageChange} />

      {imagePreview && (
        <img src={imagePreview} className="h-40 object-cover" />
      )}

      {/* Button */}
      <button disabled={isSubmitting} className="bg-blue-500 text-white p-2">
        {isSubmitting
          ? <Loader2 className="animate-spin" />
          : isEdit
          ? "Update Blog"
          : "Create Blog"}
      </button>
    </form>
  );
}

export default BlogForm;