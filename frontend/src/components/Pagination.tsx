import { ChevronLeft, ChevronRight } from "lucide-react";

type props = {
    page: number;
    setPage: (page: number) => void;
    totalPosts: number;
    limit: number;
}

function Pagination({ page, setPage, totalPosts, limit }: props) {
    const totalPages = Math.ceil((totalPosts || 0) / limit);

    return (
        <div className="flex items-center justify-between w-full max-w-80 text-gray-600 font-medium">
            {/* Prev */}
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`rounded-full p-2 transition${page === 1 ? "bg-gray-200 opacity-50 cursor-not-allowed" : "bg-slate-200 hover:bg-slate-300 cursor-pointer"}`} >
                <ChevronLeft />
            </button>

            {/* Page Info */}
            <span className="text-sm font-semibold">
                Page {page} of {totalPages}
            </span>

            {/* Next */}
            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={`rounded-full p-2 transition${page === totalPages ? "bg-gray-200 opacity-50 cursor-not-allowed" : "bg-slate-200 hover:bg-slate-300 cursor-pointer"}`} >
                <ChevronRight />
            </button>
        </div>
    );
}

export default Pagination