function Loader() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="mb-4">
                    <div className="animate-pulse flex flex-col space-y-2">
                        <div className="h-48 bg-gray-300 rounded"></div>
                        <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Loader; 