import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Blog from "./Blog";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Navbar */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-3">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 space-y-4">
        <Blog />
        <BlogCard />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home; 