import { useState } from "react";
import CreateBlog from "../components/CreateBlog";
import DashboardBlogs from "../components/DashboardBlogs";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="flex max-w-7xl mx-auto min-h-[80vh] px-5">

      {/* LEFT SIDEBAR */}
      <div className="w-64 border-r border-gray-200 p-4">
        <h1 className="text-xl font-semibold mb-6">Dashboard</h1>

        <div className="flex flex-col gap-1">
          {['Posts', 'Liked', 'Create Post'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-4 py-2 rounded-md text-sm transition-all cursor-pointer
            ${tab === activeTab
                  ? 'bg-blue-700 text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">{activeTab}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeTab === "Posts" && "Manage your posts"}
            {activeTab === "Liked" && "Your liked posts"}
            {activeTab === "Create Post" && "Create a new post"}
          </p>
        </div>

        {/* CONTENT */}
        {activeTab === "Posts" && <DashboardBlogs />}
        {activeTab === "Liked" && <DashboardBlogs />}
        {activeTab === "Create Post" && <CreateBlog />}
      </div>

    </div>
  )
}

export default Dashboard;