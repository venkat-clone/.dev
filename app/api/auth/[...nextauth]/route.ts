import NextAuth, {DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { compare,hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"

interface UserSession extends DefaultSession{
  user?: {
    id?: string | null
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const admin = await prisma.admin.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!admin) {
          throw new Error("Invalid credentials")
        }
      const hashedPassword = await hash('admin123', 12)
        const isPasswordValid = await compare(
          credentials.password,
          admin.password
        )

        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: admin.id,
          email: admin.email
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      const newSession: UserSession = { ...session }
      if (token && newSession.user) {
        newSession.user.id = token.id as string
      }
      return newSession
    }
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    // Optional: for PKCE flow
    pkceCodeVerifier: {
      name: `__Secure-next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
})



export { handler as GET, handler as POST }
