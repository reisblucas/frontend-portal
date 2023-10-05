import { SessionStrategy, DefaultSession } from 'next-auth'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signinService } from '@/signin/service'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    clientToken?: string & DefaultSession['user']
  }

  interface User {
    clientToken: string
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    clientToken: string
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.username && !credentials.password) {
          return null
        }

        try {
          const response = await signinService.login({ username: credentials.username, password: credentials.password })

          if (response.data?.token) {
            return { id: '1', clientToken: response.data.token }
          }
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (user !== undefined && user.clientToken !== undefined) {
        token = { ...token, clientToken: user.clientToken }
      }

      return token
    },
    async session({ session, token }) {
      console.log('Session callback:', { session, token })
      if (token && token['clientToken']) {
        session.clientToken = token.clientToken
      }

      return session
    },
  },
}

export default NextAuth(authOptions)
