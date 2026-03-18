function Navbar() {
    return (
        <div className="flex items-center justify-between gap-2 bg-gray-100 py-4 px-8">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-800"><span className="text-blue-500 font-bold text-3xl">B</span>logSpace</h1>
            </div>
            <div className="flex gap-2">
                <button className="relative px-6 py-1.5 font-semibold border-2 border-indigo-500 overflow-hidden group rounded cursor-pointer">
                    <span className="absolute inset-0 bg-indigo-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    <span className="relative z-10 text-indigo-500 group-hover:text-white transition-colors duration-300">
                        Login
                    </span>
                </button>
            </div>
        </div >
    )
}

export default Navbar;