import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export function Auth({ children }) {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/sign-in')
    },
  })

  if (status === 'loading') {
    return <div>Loading ...</div>
  }
  return children
}
