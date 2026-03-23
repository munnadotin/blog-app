import Blog from "./Blog";
import BlogCard from "../components/BlogCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blogs/blogSlice";
import type { AppDispatch, RootState } from "../app/store";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const blog = useSelector((state: RootState) => state.blog); 
  useEffect(() => {
    async function get() {
      if(!blog.blogs.length){
        await dispatch(fetchBlogs())
      }
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