function Navbar() {
    return (
        <div className="flex items-center justify-between gap-2 bg-gray-100 py-4 px-8">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-800">Blog App</h1>
            </div>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
            </div>
        </div>
    )
}

export default Navbar;  