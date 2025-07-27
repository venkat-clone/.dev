"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Eye, Calendar, Clock, Search } from "lucide-react"
import { useRouter } from "next/navigation"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  tags: string[]
  createdAt: string
  updatedAt: string
  readingTime: number
  published: boolean
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const router = useRouter()

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts")
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }
  }, [])

  const handleDelete = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter((post) => post.id !== postId)
      setPosts(updatedPosts)
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Digital Chronicles
          </h1>
          <p className="text-xl text-gray-300">Thoughts, tutorials, and insights from my development journey</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
            />
          </div>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag} className="bg-black">
                {tag}
              </option>
            ))}
          </select>

          <motion.button
            onClick={() => router.push("/blog/create")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white transition-all duration-300"
          >
            <Plus size={20} />
            New Post
          </motion.button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={16} className="mr-2" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock size={16} className="mr-2" />
                    {post.readingTime} min read
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-white/10 text-cyan-400 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-white/10 text-gray-400 rounded-full">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Eye size={16} />
                    Read More
                  </motion.button>

                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => router.push(`/blog/edit/${post.slug}`)}
                      whileHover={{ scale: 1.1 }}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(post.id)}
                      whileHover={{ scale: 1.1 }}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              {posts.length === 0 ? "No blog posts yet. Create your first post!" : "No posts match your search."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
