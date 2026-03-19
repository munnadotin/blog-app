import Blog from "./Blog";
import BlogCard from "../components/BlogCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "../features/blogs/blogSlice";
import type { AppDispatch } from "../app/store";

function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function get() {
      await dispatch(fetchBlogs())
    }
    get();
  }, [])

  return (
    <>
      <Blog />
      <BlogCard />
    </>
  )
}

export default Home; 