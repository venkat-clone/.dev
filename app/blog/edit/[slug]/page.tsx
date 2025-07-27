"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save } from "lucide-react"
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

export default function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    published: true,
  })

  useEffect(() => {
    const loadPost = () => {
      const savedPosts = localStorage.getItem("blogPosts")
      if (savedPosts) {
        const posts: BlogPost[] = JSON.parse(savedPosts)
        const foundPost = posts.find((p) => p.slug === params.slug)
        if (foundPost) {
          setPost(foundPost)
          setFormData({
            title: foundPost.title,
            content: foundPost.content,
            tags: foundPost.tags.join(", "),
            published: foundPost.published,
          })
        }
      }
      setLoading(false)
    }

    loadPost()
  }, [params.slug])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const generateExcerpt = (content: string) => {
    return content.replace(/[#*`]/g, "").substring(0, 150) + "..."
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!post) return

    const now = new Date().toISOString()
    const updatedPost: BlogPost = {
      ...post,
      title: formData.title,
      content: formData.content,
      excerpt: generateExcerpt(formData.content),
      slug: generateSlug(formData.title),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      updatedAt: now,
      readingTime: calculateReadingTime(formData.content),
      published: formData.published,
    }

    const savedPosts = localStorage.getItem("blogPosts")
    if (savedPosts) {
      const posts: BlogPost[] = JSON.parse(savedPosts)
      const updatedPosts = posts.map((p) => (p.id === post.id ? updatedPost : p))
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts))
      router.push(`/blog/${updatedPost.slug}`)
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
          <p className="text-gray-300 mb-8">The blog post you're trying to edit doesn't exist.</p>
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
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => router.push(`/blog/${post.slug}`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Post
              </motion.button>

              <h1 className="text-xl font-bold text-white">Edit Post</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                      placeholder="Enter post title..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                      placeholder="react, javascript, tutorial"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4 text-cyan-400 bg-white/5 border-white/10 rounded focus:ring-cyan-400"
                    />
                    <label htmlFor="published" className="text-white font-semibold">
                      Published
                    </label>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h3 className="text-white font-semibold mb-2">Markdown Guide</h3>
                    <div className="text-gray-400 text-sm space-y-1">
                      <p># Heading 1</p>
                      <p>## Heading 2</p>
                      <p>**Bold text**</p>
                      <p>*Italic text*</p>
                      <p>`Code`</p>
                      <p>\`\`\`Code block\`\`\`</p>
                      <p>[Link](url)</p>
                      <p>{"&gt;"} Quote</p>
                      <p>- List item</p>
                    </div>
                  </div>
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-white font-semibold mb-2">Content (Markdown)</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows={25}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none font-mono text-sm"
                    placeholder="Write your blog post content here using Markdown..."
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white transition-all duration-300"
                >
                  <Save size={20} />
                  Update Post
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => router.push(`/blog/${post.slug}`)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-white transition-all duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
