import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BlogCard from "../components/BlogCard";
import { useGetPostsQuery } from "../services/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Pagination from "../components/pagination";

const categories = ["All", "Technology", "Career", "Finance", "Health"];

function Blog() {
    const { register, handleSubmit, reset } = useForm();
    const [searchFilter, setSearchFilter] = useState<string>('');
    const [activeCategory, setActiveCategory] = useState("All");
    const [page, setPage] = useState<number>(1);
    const limit = 9;
    const [totalPosts, setTotalPosts] = useState<number>(1);
    const { data, isLoading, error } = useGetPostsQuery({
        category: activeCategory === "All" ? undefined : activeCategory.toLowerCase(), search: searchFilter || undefined, page, limit
    }, {
        skip: !searchFilter && activeCategory === "All" ? false : false,
    });

    useEffect(() => {
        console.log(data)
        if (data) {
            setTotalPosts(data?.totalPosts);
        }
    }, [data]);

    useEffect(() => {
        setPage(1);
    }, [searchFilter, activeCategory])

    if (error) return toast.error((error as any).data.message);
    if (isLoading) return <Loader />;

    const onSubmit = (data: any) => {
        setSearchFilter(data.search);
        reset();
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to <span className="text-blue-600">BlogSpace</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Discover stories, ideas, and knowledge from writers around the world.
                    </p>

                    {/* Search Bar */}
                    <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto">
                        <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
                            <input
                                {...register("search", { required: "Blog search is required" })}
                                type="text"
                                placeholder="Search for articles, topics, or authors..."
                                className="w-full px-6 py-4 pr-36 bg-white border-2 border-gray-200 rounded outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100  transition-all duration-300 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="py-2">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Browse Categories</h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-1 rounded font-medium transition-all duration-300 cursor-pointer
                                ${category === activeCategory
                                        ? 'text-white bg-blue-600 hover:bg-blue-700'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <BlogCard posts={data?.posts} />
            <div className="flex items-center justify-center py-3 mb-4">
                <Pagination page={page} setPage={setPage} totalPosts={totalPosts} limit={limit} />
            </div>
        </>
    )
}

export default Blog