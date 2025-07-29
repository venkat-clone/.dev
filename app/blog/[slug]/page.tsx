"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Tag, ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import ParticleBackground from "@/components/particle-background"

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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.slug}`)
        if (!response.ok) {
          if (response.status === 404) {
            setPost(null)
            return
          }
          throw new Error('Failed to fetch blog post')
        }
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  const renderMarkdown = (content: string) => {
    return content
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-white mb-4 mt-8">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-white mb-6 mt-10">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-white mb-8 mt-12">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic text-gray-300">$1</em>')
      .replace(/`([^`]*)`/gim, '<code class="bg-white/10 px-2 py-1 rounded text-cyan-400 font-mono text-sm">$1</code>')
      .replace(
        /```([^`]*)```/gim,
        '<pre class="bg-white/5 border border-white/10 rounded-xl p-4 my-6 overflow-x-auto"><code class="text-cyan-400 font-mono text-sm">$1</code></pre>',
      )
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="border-l-4 border-cyan-400 pl-4 my-6 text-gray-300 italic">$1</blockquote>',
      )
      .replace(/^- (.*$)/gim, '<li class="text-gray-300 mb-2">$1</li>')
      .replace(
        /\[([^\]]*)\]$$([^)]*)$$/gim,
        '<a href="$2" class="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      .replace(/\n\n/gim, "</p><p class='text-gray-300 mb-4'>")
      .replace(/\n/gim, "<br>")
  }



  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/blogs/${params.slug}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete post')
        }

        router.push("/blog")
      } catch (error) {
        console.error('Error deleting post:', error)
        alert('Failed to delete post. Please try again.')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <ParticleBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <motion.button
            onClick={() => router.push("/#blog")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 backdrop-blur-xl bg-black/20 border-b border-white/10 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => router.push("/#blog")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Blog
              </motion.button>

              
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
          >
            {/* Post Header */}
            <header className="mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
              >
                {post.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8"
              >
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {post.readingTime} min read
                </span>
                {post.updatedAt !== post.createdAt && (
                  <span className="text-xs">Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-2"
              >
                {(post.tags||[]).map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="px-3 py-1 bg-white/10 text-cyan-400 rounded-full text-sm flex items-center gap-1"
                  >
                    <Tag size={12} />
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </header>

            {/* Post Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="prose prose-invert max-w-none"
            >
              <div
                className="text-gray-300 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{
                  __html: `<p class="text-gray-300 mb-4">${renderMarkdown(post.content)}</p>`,
                }}
              />
            </motion.div>

            {/* Post Footer */}
            <motion.footer
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="text-gray-400 text-sm">
                  Published on {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <motion.button
                  onClick={() => router.push("/#blog")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300"
                >
                  <ArrowLeft size={16} />
                  More Posts
                </motion.button>
              </div>
            </motion.footer>
          </motion.article>
        </div>
      </div>
    </div>
  )
}
