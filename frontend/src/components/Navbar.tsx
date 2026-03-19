import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between gap-2 bg-gray-100 py-4 px-8">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-800"><span className="text-blue-500 font-bold text-3xl">B</span>logSpace</h1>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => navigate('/auth/login')}
                    className="relative px-6 py-1.5 font-semibold border-2 border-indigo-700 overflow-hidden group rounded cursor-pointer">
                    <span className="absolute inset-0 bg-blue-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    <span className="relative z-10 text-blue-700 group-hover:text-white transition-colors duration-300">
                        Login
                    </span>
                </button>
            </div>
        </div >
    )
}

export default Navbar;