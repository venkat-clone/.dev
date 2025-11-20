import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
})
// matcher: ["/admin/dashboard","/admin/change-password","/admin/blogs",],

export const config = {
  matcher: ["/admin/dashboard","/admin/change-password","/admin/blogs",],
}
