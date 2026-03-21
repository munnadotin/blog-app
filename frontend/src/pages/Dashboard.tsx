function Dashboard() {
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
            className={`px-4 py-2 text-sm ${
              tab === 'Posts' 
                ? 'border-b-2 border-black font-medium' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((post) => (
          <div key={post} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
            {/* Image Placeholder */}
            <div className="h-40 bg-gray-100"></div>
            
            {/* Content */}
            <div className="p-4">
              {/* Tags & Time */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">React</span>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs text-gray-500">5 min</span>
              </div>
              
              {/* Title */}
              <h3 className="font-medium mb-2 line-clamp-2">
                Getting Started with React and Tailwind
              </h3>
              
              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>24 likes</span>
                <span>12 comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;