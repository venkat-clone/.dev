"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Eye, Calendar, Clock, Search, ChevronRight } from "lucide-react"
import { format } from 'date-fns'
import { useRouter } from "next/navigation"
import { toast } from "sonner" // Optional: for better notifications

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
  slug?: string
  readingTime?: number
  views?: number
}

interface ApiError {
  message: string
  status?: number
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const router = useRouter()

  // Fetch blogs with proper error handling
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/blogs?published=true', {
        next: { revalidate: 300 } // ISR: revalidate every 5 minutes
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      setPosts(data)
    } catch (err) {
      const error = err as Error
      console.error('Error fetching blogs:', error)
      setError({ message: error.message })
      toast.error("Failed to load blogs")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  // Memoized filtered posts
  const filteredPosts = useMemo(() =>
      posts.filter(post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      ), [posts, searchTerm]
  )

  // Optimized reading time calculation
  const getReadingTime = useCallback((content: string): number => {
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }, [])

  // Handle post click with error boundary
  const handlePostClick = useCallback((post: BlogPost) => {
    try {
      router.push(`/blog/${post.slug || post.id}`)
    } catch (error) {
      console.error('Navigation error:', error)
      toast.error("Failed to navigate to post")
    }
  }, [router])

  // Loading State
  if (loading) {
    return (
        <section className="min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
              <p className="text-gray-400">Loading blog posts...</p>
            </div>
          </div>
        </section>
    )
  }

  // Error State
  if (error) {
    return (
        <section className="min-h-screen py-16">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <p className="text-red-400">Error: {error.message}</p>
              <button
                  onClick={fetchBlogs}
                  className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
    )
  }

  return (
      <section className="py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Digital Chronicles
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Curated thoughts, tutorials, and insights from my development journey
            </p>
          </motion.div>

          {/* Search & Stats */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col lg:flex-row gap-6 mb-12"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                  type="text"
                  placeholder="Search posts by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  aria-label="Search blog posts"
              />
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Eye size={16} />
              <span>Total Posts: {posts.length}</span>
            </span>
              <span className="flex items-center gap-2">
              {filteredPosts.length !== posts.length && (
                  <span className="text-cyan-400">Filtered: {filteredPosts.length}</span>
              )}
            </span>
            </div>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map((post, index) => (
                <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => handlePostClick(post)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePostClick(post)}
                >
                  <div className="p-6 h-full flex flex-col">
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-400 mb-6 line-clamp-3 flex-grow">
                      {post.excerpt || post.content}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <time dateTime={post.createdAt}>
                            {format(new Date(post.createdAt), 'MMM d, yyyy')}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.readingTime || getReadingTime(post.content)} min</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm">Read More</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
              <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24"
              >
                <div className="inline-block p-8 bg-white/5 rounded-full mb-6">
                  <Search className="text-gray-400" size={48} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                  {posts.length === 0 ? 'No Posts Yet' : 'No Posts Found'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {posts.length === 0
                      ? 'Stay tuned for upcoming content!'
                      : 'Try adjusting your search terms.'
                  }
                </p>
                {posts.length > 0 && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="px-6 py-3 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors"
                    >
                      Clear Search
                    </button>
                )}
              </motion.div>
          )}
        </div>
      </section>
  )
}