import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { logOut } from "../features/auth/authSlice";
import toast from "react-hot-toast";

function Navbar() {
    const user = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const res = await dispatch(logOut()).unwrap();
            navigate("/auth/login");
            toast.success(res.message);
        } catch (error) {
            toast.error(error as string);
        }
    }

    return (
        <div className="flex items-center justify-between gap-2 bg-gray-100 py-4 px-8">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate('/')}
                    className="text-2xl font-bold text-gray-800 cursor-pointer"><span className="text-blue-500 font-bold text-3xl">B</span>logSpace</button>

            </div>
            <div className="flex gap-2">
                {user.user ? user && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate('/auth/dashboard')}
                            className="relative px-6 py-1.5 font-semibold border-2 border-indigo-700 overflow-hidden group rounded cursor-pointer">
                            <span className="absolute inset-0 bg-blue-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                            <span className="relative z-10 text-blue-700 group-hover:text-white transition-colors duration-300">
                                Dashboard
                            </span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="relative px-6 py-1.5 font-semibold border-2 border-indigo-700 overflow-hidden group rounded cursor-pointer">
                            <span className="absolute inset-0 bg-blue-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                            <span className="relative z-10 text-blue-700 group-hover:text-white transition-colors duration-300">
                                Logout
                            </span>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/auth/login')}
                        className="relative px-6 py-1.5 font-semibold border-2 border-indigo-700 overflow-hidden group rounded cursor-pointer">
                        <span className="absolute inset-0 bg-blue-700 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                        <span className="relative z-10 text-blue-700 group-hover:text-white transition-colors duration-300">
                            Login
                        </span>
                    </button>
                )}
            </div>
        </div >
    )
}

export default Navbar;