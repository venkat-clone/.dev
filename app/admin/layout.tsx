'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/admin/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Button
                  variant="link"
                  onClick={() => router.push('/admin/dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push('/admin/blogs')}
                >
                  Manage Blogs
                </Button>
                <Button
                  variant="link"
                  onClick={() => router.push('/admin/change-password')}
                >
                  Change Password
                </Button>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-4">{session.user?.email}</span>
              <Button
                variant="destructive"
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
