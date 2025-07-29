'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface BlogData {
  id: string
  title: string
  content: string
  published: boolean
}

export default function EditBlogPage({
  params,
}: {
  params: { id: string }
}) {
  const [blog, setBlog] = useState<BlogData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchBlog()
  }, [params.id])

  async function fetchBlog() {
    try {
      const response = await fetch(`/api/blogs/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch blog')
      const data = await response.json()
      setBlog(data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch blog',
      })
      router.push('/admin/blogs')
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const published = formData.get('published') === 'on'

    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          published,
        }),
      })

      if (!response.ok) throw new Error('Failed to update blog')

      toast({
        title: 'Success',
        description: 'Blog updated successfully',
      })

      router.push('/admin/blogs')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update blog',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                disabled={loading}
                defaultValue={blog.title}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                required
                disabled={loading}
                defaultValue={blog.content}
                rows={10}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                name="published"
                defaultChecked={blog.published}
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <div className="flex space-x-2">
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Blog'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
