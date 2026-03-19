import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout() {

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            {/* Navbar */}
            <div className="max-w-7xl mx-auto w-full px-4 pt-3">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-4">
                <Outlet />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Layout