import { useEffect } from "react"

function DashboardBlogs() {
  useEffect(() => {
    console.log("DashboardBlogs")
  }, [])

  return (
    <div>DashboardBlogs</div>
  )
}

export default DashboardBlogs