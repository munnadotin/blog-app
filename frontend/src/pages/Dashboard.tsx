import { useState } from "react";
import CreateBlog from "../components/CreateBlog";
import DashboardBlogs from "../components/DashboardBlogs";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your content</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {['Posts', 'Liked', 'Create Post'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm transition-all delay-75 cursor-pointer ${tab === activeTab
              ? 'border-b-2 border-black font-medium'
              : 'text-gray-500 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      {activeTab === "Posts" && (<DashboardBlogs />)}

      {/* Liked Posts Grid */}
      {activeTab === "Liked" && (<DashboardBlogs />)}

      {/* Create Post Form */}
      {activeTab === "Create Post" && (<CreateBlog />)}
    </div>
  )
}

export default Dashboard;