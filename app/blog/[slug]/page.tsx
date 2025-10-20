"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import {
  Calendar, Clock, Tag, ArrowLeft, Edit, Trash2, ChevronUp, Copy, Eye
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import ParticleBackground from "@/components/particle-background"
import { format, parseISO } from "date-fns"
import "katex/dist/katex.min.css"

// ==================== INTERFACES ====================
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

interface ApiError { message: string; status?: number }

// ==================== CONSTANTS ====================
const CONTAINER_MAX_WIDTH = "max-w-7xl"
const TOC_MIN_HEADERS = 2

// ==================== CUSTOM COMPONENTS ====================
const CustomH1 = ({ children }: { children: React.ReactNode }) => (
  <h1 id={children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
    className="text-5xl font-bold text-white mb-10 mt-20 scroll-mt-20 border-b border-cyan-400 pb-6">
    {children}
  </h1>
)

const CustomH2 = ({ children }: { children: React.ReactNode }) => (
  <h2 id={children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
    className="text-3xl font-bold text-white mb-8 mt-16 scroll-mt-20 border-b border-white/10 pb-4">
    {children}
  </h2>
)

const CustomH3 = ({ children }: { children: React.ReactNode }) => (
  <h3 id={children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
    className="text-2xl font-bold text-white mb-6 mt-12 scroll-mt-20">
    {children}
  </h3>
)

const CustomCode = ({ children, className }: { children: string; className?: string }) => (
  <code className={className?.includes("language-")
    ? "bg-white/5 border border-white/10 rounded-xl p-6 my-8 overflow-x-auto text-cyan-400 font-mono text-sm block"
    : "bg-white/10 px-2 py-1 rounded text-cyan-400 font-mono text-sm border border-white/20 inline"
  }>
    {children}
  </code>
)

const CustomBlockquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-cyan-400 pl-6 my-8 text-gray-300 italic bg-white/5 rounded-r-xl py-4">
    {children}
  </blockquote>
)

const CustomA = ({ children, href }: { children: React.ReactNode; href?: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50">
    {children}
  </a>
)

const CustomImg = ({ children, alt, src }: { children?: never; alt: string; src: string }) => (
  <img src={src} alt={alt} className="my-8 rounded-xl max-w-full h-auto shadow-lg border border-white/10" />
)

const CustomLi = ({ children }: { children: React.ReactNode }) => (
  <li className="text-gray-300 mb-3 ml-6 list-disc">{children}</li>
)

const CustomP = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-300 mb-8 leading-relaxed text-lg">{children}</p>
)

// ==================== MAIN COMPONENT ====================
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // 🪝 ALL HOOKS - TOP LEVEL
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const router = useRouter()

  // 📡 API Calls
  const fetchPost = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setPost(null)

      const response = await fetch(`/api/blogs/${params.slug}`, {
        next: { revalidate: 60 }
      })

      if (response.status === 404) throw new Error("Post not found")
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      setPost(data)
    } catch (err) {
      const error = err as Error
      setError({ message: error.message })
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [params.slug])

  const deletePost = useCallback(async () => {
    try {
      const response = await fetch(`/api/blogs/${params.slug}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete')
      toast.success("Post deleted!")
      router.push("/blog")
    } catch {
      toast.error("Delete failed")
    }
  }, [params.slug, router])

  // 🎨 Computed Values
  const tableOfContents = useMemo(() => {
    if (!post?.content) return []
    const headers = post.content.match(/^(#{1,3})\s+(.+)$/gim) || []
    return headers.slice(0, 10).map((header) => {
      const match = header.match(/^(#{1,3})\s+(.+)$/)
      const level = match?.[1].length || 1
      const text = match?.[2].trim() || ''
      return {
        id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        text,
        level
      }
    })
  }, [post?.content])

  // 🚀 Event Handlers
  const copyToClipboard = useCallback(async () => {
    if (!navigator.clipboard) return toast.error("Copy not supported")
    setIsCopying(true)
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Copied!")
    } catch {
      toast.error("Copy failed")
    } finally {
      setIsCopying(false)
    }
  }, [])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">

        {/* 📌 Sticky Header */}
        <StickyHeader
          onBack={() => router.push("/blog")}
          onCopy={copyToClipboard}
          isCopying={isCopying}
          views={post?.views || 0}
          published={post?.published}
        />

        <div className={CONTAINER_MAX_WIDTH + " mx-auto px-4 py-12"}>
          {renderContent({
            loading,
            error,
            post,
            tableOfContents,
            onRetry: fetchPost,
            onBack: () => router.push("/blog"),
            onEdit: () => router.push(`/admin/edit/${post?.slug}`),
            onDelete: () => setShowDeleteConfirm(true),
            showTOC: tableOfContents.length >= TOC_MIN_HEADERS
          })}
        </div>

        {/* 🗑️ Delete Modal */}
        {showDeleteConfirm && (
          <DeleteModal
            onConfirm={deletePost}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </div>
    </div>
  )
}

// ==================== SUB-COMPONENTS (UNCHANGED) ====================
function StickyHeader({ onBack, onCopy, isCopying, views, published }: any) {
  return (
    <header className="sticky top-0 backdrop-blur-xl bg-black/30 border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.button onClick={onBack} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Blog
          </motion.button>
          <div className="flex items-center gap-4">
            <motion.button onClick={onCopy} disabled={isCopying} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all disabled:opacity-50">
              {isCopying ? <Clock size={16} /> : <Copy size={16} />} Share
            </motion.button>
            {published && (
              <motion.button whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white">
                <Eye size={16} /> {views} views
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function renderContent({ loading, error, post, tableOfContents, onRetry, onBack, onEdit, onDelete, showTOC }: any) {
  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} onRetry={onRetry} onBack={onBack} />
  if (!post) return <ErrorState error={{ message: "Post not found" }} onRetry={onBack} onBack={onBack} />

  return (
    <div className="grid lg:grid-cols-4 gap-12">
      <Article post={post} />
      <Sidebar tableOfContents={tableOfContents} showTOC={showTOC} onEdit={onEdit} onDelete={onDelete} published={post.published} />
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400" />
      <p className="text-gray-400">Loading post...</p>
    </div>
  )
}

function ErrorState({ error, onRetry, onBack }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-white">Post Not Found</h1>
      <p className="text-gray-300">{error.message}</p>
      <div className="space-y-2">
        <motion.button onClick={onBack} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white">
          <ArrowLeft size={20} /> Back to Blog
        </motion.button>
        <motion.button onClick={onRetry} whileHover={{ scale: 1.05 }} className="px-6 py-3 bg-white/20 text-white rounded-xl">
          {error.message === "Post not found" ? "Go to Blog" : "Retry"}
        </motion.button>
      </div>
    </div>
  )
}

function Article({ post }: { post: BlogPost }) {
  return (
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
            <Clock size={16} /> {post.readingTime} min read
          </span>
          {post.updatedAt !== post.createdAt && (
            <span className="text-xs">Updated {format(parseISO(post.updatedAt), 'MMM d')}</span>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2">
          {post.tags?.map((tag, index) => (
            <motion.span key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + index * 0.05 }} className="px-3 py-1.5 bg-white/10 text-cyan-400 rounded-full text-sm flex items-center gap-1 border border-white/20">
              <Tag size={12} /> {tag}
            </motion.span>
          ))}
        </motion.div>
      </header>

      {/* 🔥 PROPER REACT MARKDOWN RENDERING */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, [rehypeRaw, { clobberPrefix: "custom-" }]]}
          components={{
            
            h1: CustomH1,
            h2: CustomH2,
            h3: CustomH3,
            code: CustomCode,
            blockquote: CustomBlockquote,
            a: CustomA,
            img: CustomImg,
            li: CustomLi,
            p: CustomP
          }}
          // className="prose prose-invert max-w-none"
        >
          {post.content}
        </ReactMarkdown>
      </motion.div>
    </motion.article>
  )
}

// Sidebar, DeleteModal remain UNCHANGED...
function Sidebar({ tableOfContents, showTOC, onEdit, onDelete, published }: any) {
  return (
    <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-1 sticky top-24 h-fit space-y-8">
      {showTOC && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <ChevronUp size={16} /> Contents
          </h3>
          <nav className="space-y-2 max-h-96 overflow-y-auto">
            {tableOfContents.map((item: any) => (
              <a key={item.id} href={`#${item.id}`} className={`block py-2 px-3 rounded-lg text-sm transition-colors ${item.level === 1 ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}>
                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}
      {!published && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Admin Actions</h3>
          <div className="space-y-2">
            <motion.button whileHover={{ scale: 1.02 }} onClick={onEdit} className="w-full flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-xl transition-all">
              <Edit size={16} /> Edit Post
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} onClick={onDelete} className="w-full flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl transition-all">
              <Trash2 size={16} /> Delete Post
            </motion.button>
          </div>
        </div>
      )}
    </motion.aside>
  )
}

function DeleteModal({ onConfirm, onCancel }: any) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold text-white mb-4">Delete Post?</h3>
        <p className="text-gray-300 mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">Delete</button>
          <button onClick={onCancel} className="flex-1 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors">Cancel</button>
        </div>
      </div>
    </motion.div>
  )
}