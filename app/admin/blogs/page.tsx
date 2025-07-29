'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { formatDistanceToNow } from 'date-fns'

interface Blog {
  id: string
  title: string
  content: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchBlogs()
  }, [])

  async function fetchBlogs() {
    try {
      const response = await fetch('/api/blogs')
      if (!response.ok) throw new Error('Failed to fetch blogs')
      const data = await response.json()
      setBlogs(data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch blogs',
      })
    } finally {
      setLoading(false)
    }
  }

  async function deleteBlog(id: string) {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete blog')

      toast({
        title: 'Success',
        description: 'Blog deleted successfully',
      })

      fetchBlogs()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete blog',
      })
    }
  }

  async function togglePublish(id: string, currentState: boolean) {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !currentState,
        }),
      })

      if (!response.ok) throw new Error('Failed to update blog')

      toast({
        title: 'Success',
        description: `Blog ${!currentState ? 'published' : 'unpublished'} successfully`,
      })

      fetchBlogs()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update blog',
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blogs</h2>
        <Button onClick={() => router.push('/admin/blogs/create')}>
          Create New Blog
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>{blog.title}</TableCell>
              <TableCell>
                <Button
                  variant={blog.published ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => togglePublish(blog.id, blog.published)}
                >
                  {blog.published ? 'Published' : 'Draft'}
                </Button>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(blog.updatedAt), { addSuffix: true })}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteBlog(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
