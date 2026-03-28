import { Calendar1, ChevronRight, Clock, FileX, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useAddLikeMutation } from "../services/api";
import type { Post } from "../types/post.type";

type props = {
  posts: Post[];
};

function BlogCard({ posts }: props) {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [addLike] = useAddLikeMutation();

  async function handleLike(id: string) {
    try {
      const res = await addLike(id).unwrap();
      toast.success(res.message);
    } catch (error: any) {
      const msg = error?.data?.message || error?.data || error.message;
      toast.error(msg);
    }
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">

        {/* Icon */}
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <FileX className="w-12 h-12 text-gray-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No Posts Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 max-w-md mb-6">
          Looks like there are no posts available right now. Try refreshing or check back later.
        </p>
      </div>);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto">
      {posts.map((blog: Post) => (
        <article
          key={blog._id}
          className="group bg-white rounded-md overflow-hidden border-2 border-slate-200"
        >
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img
              src={blog.ImageCapture}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Reading Time */}
            <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-lg flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {blog.readingTime} min read
            </div>
          </div>

          {/* Content Container */}
          <div className="p-6">
            {/* Category & Date Row */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
              </span>
              <time className="text-xs text-gray-500 flex items-center gap-1.5">
                <Calendar1 className="h-4 w-4" />
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {blog.title}
            </h2>

            {/* Content Preview */}
            <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
              {blog.content}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                {blog.authorId?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{blog.authorId?.name?.charAt(0).toUpperCase() + blog.authorId?.name?.slice(1)}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-3 py-1.5 rounded-full bg-blue-100 text-gray-700 hover:bg-blue-200 transition-colors duration-300 cursor-default font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Engagement Stats */}
            <div className="flex items-center gap-6 text-sm">
              <button
                onClick={() => handleLike(blog._id)}
                className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                <Heart
                  className={`w-5 h-5 ${blog.likes.includes(userId!) ? 'text-red-500 fill-red-500' : ''}`}
                />
                <span className="font-medium">{blog.likes.length}</span>
              </button>
              <span className="flex items-center gap-1.5 text-gray-600">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{blog.comments.length}</span>
              </span>
            </div>

            {/* Read More Link */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                to={`/blog/${blog.slug}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center gap-2 group/btn cursor-pointer">
                Read full article
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default BlogCard;