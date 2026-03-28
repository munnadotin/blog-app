import type { Post } from '../types/post.type'

type BlogCardProps = {
    Posts: Post[];
    onRead: (post: Post) => void;
    onEdit?: (post: Post) => void;
}

function Card({ Posts, onRead, onEdit }: BlogCardProps) {
    if(!Posts || Posts.length === 0){
        return <div className="text-center text-slate-500 py-8">No posts found</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Posts.map((post) => (
                <div
                    key={post._id}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition flex flex-col"
                >
                    {/* Image */}
                    <img
                        className="w-full h-48 object-cover"
                        src={post.ImageCapture}
                        alt={post.title}
                    />

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="px-2 py-0.5 border rounded bg-slate-100">
                                {post.category}
                            </span>
                            <span>
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg font-semibold mt-2 line-clamp-2">
                            {post.title}
                        </h2>

                        {/* Content */}
                        <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                            {post.content}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2 max-h-16 overflow-hidden">
                            {post.tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded"
                                >
                                    #{tag}
                                </span>
                            ))}

                            {post.tags.length > 4 && (
                                <span className="text-xs text-slate-500">
                                    +{post.tags.length - 4} more
                                </span>
                            )}
                        </div>

                        {/* Spacer */}
                        <div className="mt-auto flex gap-2 pt-3">
                            {<button onClick={() => onRead(post)} className="flex-1 text-sm bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition cursor-pointer">
                                Read More
                            </button>}
                            {onEdit && <button onClick={() => onEdit(post)} className="flex-1 text-sm bg-white-600 border-2 py-1.5 rounded border-slate-300 transition cursor-pointer">
                                Edit
                            </button>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card