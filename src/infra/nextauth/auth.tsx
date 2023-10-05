import { Flex, Spinner } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export function Auth({ children }) {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/signin')
    },
  })

  const isLoading = status === 'loading'

  if (isLoading) {
    return (
      <Flex width="full" height="100vh" justifyContent="center" alignItems="center" gap={2}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
      </Flex>
    )
  }
  return children
}
