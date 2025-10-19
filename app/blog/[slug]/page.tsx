"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Edit,
  Trash2,
  ChevronUp,
  Share2,
  Eye,
  Copy
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import ParticleBackground from "@/components/particle-background"
import { format, parseISO } from "date-fns"

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
  views?: number
}

interface ApiError {
  message: string
  status?: number
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // 🎯 ALL HOOKS AT TOP - NEVER MOVED!
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const router = useRouter()

  // 1. Fetch Post
  const fetchPost = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setPost(null)
      const response = await fetch(`/api/blogs/${params.slug}`, {
        next: { revalidate: 60 }
      })

      if (response.status === 404) {
        setPost(null)
        setError({ message: "Post not found" })
        return
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      setPost(data)
    } catch (err) {
      const error = err as Error
      console.error('Error fetching post:', error)
      setError({ message: error.message })
      toast.error("Failed to load post")
    } finally {
      setLoading(false)
    }
  }, [params.slug])

  // 2. Markdown Parser
  const renderMarkdown = useCallback((content: string) => {
    return content
        .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-white mb-6 mt-12 scroll-mt-20">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-white mb-8 mt-16 scroll-mt-20 border-b border-white/10 pb-4">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-5xl font-bold text-white mb-10 mt-20 scroll-mt-20 border-b border-cyan-400 pb-6">$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-white">$1</strong>')
        .replace(/\*(.*)\*/gim, '<em class="italic text-gray-300">$1</em>')
        .replace(/`([^`]*)`/gim, '<code class="bg-white/10 px-2 py-1 rounded text-cyan-400 font-mono text-sm border border-white/20">$1</code>')
        .replace(/```([\s\S]*?)```/gim, '<div class="bg-white/5 border border-white/10 rounded-xl p-6 my-8 overflow-x-auto"><pre class="text-cyan-400 font-mono text-sm"><code>$1</code></pre></div>')
        .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-cyan-400 pl-6 my-8 text-gray-300 italic bg-white/5 rounded-r-xl py-4">$1</blockquote>')
        .replace(/^- (.*$)/gim, '<li class="text-gray-300 mb-3 ml-6 list-disc"> $1</li>')
        .replace(/^\* (.*$)/gim, '<li class="text-gray-300 mb-3 ml-6 list-disc"> $1</li>')
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, `<img src="$2" alt="$1" class="my-8 rounded-xl max-w-full h-auto shadow-lg border border-white/10">`)
        .replace(/\n\n/gim, "</p><p class='text-gray-300 mb-8 leading-relaxed text-lg'>")
        .replace(/\n/gim, "<br>")
  }, [])

  // 3. Copy to Clipboard
  const copyToClipboard = useCallback(async () => {
    if (!navigator.clipboard) return toast.error("Copy not supported")
    setIsCopying(true)
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied!")
    } catch {
      toast.error("Failed to copy")
    } finally {
      setIsCopying(false)
    }
  }, [])

  // 4. Delete Handler
  const handleDelete = useCallback(async () => {
    setShowDeleteConfirm(false)
    try {
      const response = await fetch(`/api/blogs/${params.slug}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete')
      toast.success("Post deleted successfully!")
      router.push("/blog")
    } catch (error) {
      console.error('Delete error:', error)
      toast.error("Failed to delete post")
    }
  }, [params.slug, router])

  // 5. Table of Contents (ONLY when post exists)
  const tableOfContents = useMemo(() => {
    if (!post?.content) return []
    const headers = post.content.match(/^(#{1,3})\s+(.+)$/gim) || []
    return headers.map((header) => {
      const match = header.match(/^(#{1,3})\s+(.+)$/)
      const level = match?.[1].length || 1
      const text = match?.[2].trim() || ''
      return { id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-'), text, level }
    })
  }, [post?.content])

  // 6. Render Content (ONLY when post exists)
  const htmlContent = useMemo(() => {
    if (!post?.content) return ''
    return `<p class="text-gray-300 mb-8 leading-relaxed text-lg">${renderMarkdown(post.content)}</p>`
  }, [post?.content, renderMarkdown])

  // 🔥 ALL HOOKS ABOVE - NOW SAFE TO RENDER CONDITIONALLY

  return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <ParticleBackground />

        <div className="relative z-10">
          {/* Sticky Header - ALWAYS RENDERS */}
          <header className="sticky top-0 backdrop-blur-xl bg-black/30 border-b border-white/10 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <motion.button
                    onClick={() => router.push("/blog")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowLeft size={20} />
                  Blog
                </motion.button>

                <div className="flex items-center gap-4">
                  <motion.button
                      onClick={copyToClipboard}
                      disabled={isCopying || !post}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all disabled:opacity-50"
                  >
                    {isCopying ? <Clock size={16} /> : <Copy size={16} />}
                    Share
                  </motion.button>

                  {post?.published && post && (
                      <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white"
                      >
                        <Eye size={16} />
                        {post.views || 0} views
                      </motion.button>
                  )}
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 py-12">
            {loading ? (
                /* LOADING STATE */
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                  <p className="text-gray-400">Loading post...</p>
                </div>
            ) : error ? (
                /* ERROR STATE */
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center max-w-md mx-auto">
                  <h1 className="text-4xl font-bold text-white">Post Not Found</h1>
                  <p className="text-gray-300">{error.message}</p>
                  <motion.button
                      onClick={() => router.push("/blog")}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white"
                  >
                    <ArrowLeft size={20} />
                    Back to Blog
                  </motion.button>
                  <motion.button
                      onClick={fetchPost}
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 bg-white/20 text-white rounded-xl"
                  >
                    Retry
                  </motion.button>
                </div>
            ) : post ? (
                /* SUCCESS STATE */
                <div className="grid lg:grid-cols-4 gap-12">
                  {/* Main Content */}
                  <motion.article initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-3">
                    <header className="mb-16">
                      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
                        {post.title}
                      </motion.h1>

                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center gap-8 text-gray-400 text-sm mb-8">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      <time dateTime={post.createdAt}>{format(parseISO(post.createdAt), 'MMMM d, yyyy')}</time>
                    </span>
                        <span className="flex items-center gap-2">
                      <Clock size={16} />
                          {post.readingTime} min read
                    </span>
                        {post.updatedAt !== post.createdAt && (
                            <span className="text-xs">Updated {format(parseISO(post.updatedAt), 'MMM d')}</span>
                        )}
                      </motion.div>

                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2">
                        {post.tags?.map((tag, index) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.05 }}
                                className="px-3 py-1.5 bg-white/10 text-cyan-400 rounded-full text-sm flex items-center gap-1 border border-white/20"
                            >
                              <Tag size={12} />
                              {tag}
                            </motion.span>
                        ))}
                      </motion.div>
                    </header>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="prose prose-invert max-w-none">
                      <div className="text-gray-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </motion.div>
                  </motion.article>

                  {/* Sidebar */}
                  <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-1 sticky top-24 h-fit">
                    {tableOfContents.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <ChevronUp size={16} /> Contents
                          </h3>
                          <nav className="space-y-2">
                            {tableOfContents.map((item) => (
                                <a key={item.id} href={`#${item.id}`} className={`block py-2 px-3 rounded-lg text-sm transition-colors ${item.level === 1 ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>
                                  {item.text}
                                </a>
                            ))}
                          </nav>
                        </div>
                    )}

                    {!post.published && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                          <h3 className="text-lg font-semibold text-white">Admin Actions</h3>
                          <div className="space-y-2">
                            <motion.button whileHover={{ scale: 1.02 }} className="w-full flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-xl transition-all" onClick={() => router.push(`/admin/edit/${post.slug}`)}>
                              <Edit size={16} /> Edit Post
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.02 }} className="w-full flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl transition-all" onClick={() => setShowDeleteConfirm(true)}>
                              <Trash2 size={16} /> Delete Post
                            </motion.button>
                          </div>
                        </div>
                    )}
                  </motion.aside>
                </div>
            ) : null}
          </div>

          {/* Delete Confirmation - ALWAYS SAME POSITION */}
          {showDeleteConfirm && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full">
                  <h3 className="text-2xl font-bold text-white mb-4">Delete Post?</h3>
                  <p className="text-gray-300 mb-6">This action cannot be undone.</p>
                  <div className="flex gap-3">
                    <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600">Delete</button>
                    <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30">Cancel</button>
                  </div>
                </div>
              </motion.div>
          )}
        </div>
      </div>
  )
}