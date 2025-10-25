import { GetServerSideProps } from "next"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import {
  Calendar, Clock, Tag, ArrowLeft, Eye,
  ChevronUp
} from "lucide-react"
import { format, parseISO } from "date-fns"
import { prisma } from '@/lib/prisma';
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import ParticleBackground from "@/components/particle-background"
// import "../../styles/global.css";  // Path to your global CSS file
import "../../styles/globals.css"

import "katex/dist/katex.min.css"

// ==================== INTERFACES ====================
interface BlogPost {
  id: string
  title: string
  content: string
  // excerpt: string
  // slug: string
  // tags: string[]
  createdAt: string | Date
  updatedAt: string | Date
  // readingTime: number
  published: boolean
  views?: number
}

interface ApiError { message: string; status?: number }

interface BlogPostPageProps {
  post: BlogPost | null
  error: ApiError | null
}

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
export default function BlogPostPage({ post, error }: BlogPostPageProps) {
  // Computed table of contents
  const tableOfContents = post?.content
    ? (post.content.match(/^(#{1,3})\s+(.+)$/gim) || []).slice(0, 10).map((header) => {
        const match = header.match(/^(#{1,3})\s+(.+)$/)
        const level = match?.[1].length || 1
        const text = match?.[2].trim() || ''
        return {
          id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          text,
          level
        }
      })
    : []

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        {/* 📌 Sticky Header */}
        <StickyHeader views={post?.views || 0} published={!!post?.published} />

        <div className={CONTAINER_MAX_WIDTH + " mx-auto px-4 py-12"}>
          {renderContent({
            error,
            post,
            tableOfContents,
            showTOC: tableOfContents.length >= TOC_MIN_HEADERS
          })}
        </div>
      </div>
    </div>
  )
}

// ==================== SUB-COMPONENTS ====================
function StickyHeader({ views, published }: { views: number; published: boolean }) {
  return (
    <header className="sticky top-0 backdrop-blur-xl bg-black/30 border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/blog" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft size={20} /> Blog
          </a>

        </div>
      </div>
    </header>
  )
}

function renderContent({ error, post, tableOfContents, showTOC }: any) {
  if (error) return <ErrorState error={error} />
  if (!post) return <ErrorState error={{ message: "Post not found" }} />

  return (
    <div className="grid lg:grid-cols-4 gap-12">
      <Article post={post} />
      <Sidebar tableOfContents={tableOfContents} showTOC={showTOC} published={post.published} />
    </div>
  )
}

function ErrorState({ error }: { error: ApiError }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-white">Post Not Found</h1>
      <p className="text-gray-300">{error.message}</p>
      <div className="space-y-2">
        <a href="/blog" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white">
          <ArrowLeft size={20} /> Back to Blog
        </a>
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
        >
          {post.content}
        </ReactMarkdown>
      </motion.div>
    </motion.article>
  )
}

function Sidebar({ tableOfContents, showTOC, published }: any) {
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
    </motion.aside>
  )
}

// ==================== SERVER-SIDE DATA FETCHING ====================
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string }

  try {

      const blog = await prisma.blog.findUnique({
          where: { id: slug }
        });
    

    if (!blog) {
      return {
        props: {
          post: null,
          error: { message: "Post not found" }
        }
      }
    }


    const post: BlogPost = {
      ...blog,
      createdAt: blog.createdAt.toISOString(),
  updatedAt: blog.updatedAt.toISOString(),

    }

    return {
      props: {
        post,
        error: null
      }
    }
  } catch (err) {
    const error = err as Error
    console.log(error);
    return {
      props: {
        post: null,
        error: { message: error.message || "Failed to fetch post" }
      }
    }
  }
}