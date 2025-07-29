'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Stats {
  totalBlogs: number
  publishedBlogs: number
  draftBlogs: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/blogs')
        if (!response.ok) throw new Error('Failed to fetch blogs')
        const blogs = await response.json()
        
        setStats({
          totalBlogs: blogs.length,
          publishedBlogs: blogs.filter((blog: any) => blog.published).length,
          draftBlogs: blogs.filter((blog: any) => !blog.published).length,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalBlogs}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Published</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.publishedBlogs}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Drafts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.draftBlogs}</p>
        </CardContent>
      </Card>
    </div>
  )
}
