import { SessionStrategy, DefaultSession } from 'next-auth'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signinService } from '@/signin/service'
import { DefaultJWT, JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    token?: string & DefaultSession['user']
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    token: {
      user: {
        clientToken: string
      }
    } & DefaultJWT
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
            console.log('authorize token', response.data.token)
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
    async session({ session, token }) {
      if (token && token.token.user.clientToken) {
        session.token = token.token.user.clientToken
      }

      return session
    },
    async jwt(params) {
      const sessionclone = { ...params.session }
      params.session = { ...sessionclone, token: params.token }
      return params as unknown as JWT
    },
  },
}

export default NextAuth(authOptions)
