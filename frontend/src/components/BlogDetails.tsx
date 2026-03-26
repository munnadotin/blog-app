import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { Calendar1, Clock1, Heart, MessageCircle, Reply, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { commentPost, likePost } from "../api/post.action.api";
import type { RootState } from "../app/store";
import toast from "react-hot-toast";
import { useGetPostbySlugQuery } from "../services/api";

function BlogDetails() {
    const { slug } = useParams<{ slug: string }>();
    const { data, isLoading } = useGetPostbySlugQuery(slug, {
        skip: !slug
    });

    const { register, handleSubmit, formState: { errors } } = useForm<{ content: string }>();
    const userId = useSelector((state: RootState) => state.auth.user?._id);

    if (isLoading) return <Loader />;

    console.log(data)
    async function onSubmit(data: { content: string }) {
        try {
            const res = await commentPost(data?.content, data.content);
            toast.success(res.data.message)
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    async function handleLike(postId: string) {
        try {
            const res = await likePost(postId);
            toast.success(res.data.message);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.response?.data?.error || error.message);
        }
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Hero Image */}
                        <div className="relative h-96 rounded-2xl overflow-hidden border border-gray-200">
                            <img
                                src={data.post?.ImageCapture}
                                alt={data.post?.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Image Overlay with gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        {/* Title (if not on image) */}
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                            {data.post?.title}
                        </h1>

                        {/* Author Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm border-b border-gray-200 pb-6">
                            {/* Author Avatar */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold">
                                    {data.post?.authorId?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{data.post?.authorId?.name}</p>
                                    <p className="text-xs text-gray-500">Author</p>
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="flex items-center gap-4 text-gray-600 ml-auto">
                                {/* Date */}
                                <span className="flex items-center gap-1.5">
                                    <Calendar1 className="h-5 w-5" />
                                    {new Date(data.post?.createdAt!).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>

                                {/* Reading Time */}
                                <span className="flex items-center gap-1.5">
                                    <Clock1 className="h-5 w-5" />
                                    {data.post?.readingTime} min read
                                </span>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-gray-500 mr-2">Topics:</span>
                            {data.post?.tags.map((tag: string) => (
                                <span
                                    key={tag}
                                    className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Blog Content */}
                        <div className="prose prose-lg max-w-none">
                            {data.post?.content.split('\n\n').map((paragraph: string, index: number) => (
                                <p key={index} className="text-gray-700 leading-relaxed mb-6 text-base">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {/* Engagement Section */}
                        <div className="flex items-center justify-between py-6 border-y border-gray-200">
                            <div className="flex items-center gap-6">
                                {/* Like Button */}
                                <button onClick={() => handleLike(data.post?._id!)} className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors">
                                    <Heart className={`w-5 h-5 ${data.post?.likes.includes(userId!) ? 'text-red-500 fill-red-500' : ''}`} />
                                    <span className="font-medium">{data.post?.likes?.length || 0} likes</span>
                                </button>

                                {/* Comments Count */}
                                <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                                    <MessageCircle className="h-6 w-6" />
                                    <span className="font-medium">{data.post?.comments?.length || 0} comments</span>
                                </button>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="pt-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments ({data.post?.comments?.length || 0})</h3>

                            {/* Comments List */}
                            <div className="space-y-6">
                                {data.post?.comments?.map((comment: any) => (
                                    <div key={comment._id} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-400 to-gray-600 shrink-0"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{comment.user.name}</h4>
                                                    <span className="text-sm text-gray-500">{comment.user.email}</span>
                                                </div>
                                                <span className="flex flex-col gap-2 text-xs text-gray-500">
                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                    <div className="flex items-center gap-3">
                                                        {/* reply and delete */}
                                                        <Reply className="h-5 w-6" />
                                                        <Trash2 className="h-4 w-5" />
                                                    </div>
                                                </span>
                                            </div>
                                            <p className="text-gray-700">{comment.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Comment */}
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                                <textarea
                                    {...register("content", { required: "Comment is required" })}
                                    placeholder="Add a comment..."
                                    className="w-full p-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    rows={3}
                                />
                                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                                <div className="flex justify-end mt-2">
                                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                        Post Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Author Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white text-2xl font-bold">
                                    {data.post?.authorId?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{data.post?.authorId?.name}</h4>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                Passionate writer and content creator. Sharing knowledge and insights with the community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails;