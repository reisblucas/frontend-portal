import SigninForm from '@/signin/components/SigninForm'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const session = useSession()

  if (session.status === 'authenticated') {
    router.push('/medications')
    return
  }

  return (
    <Flex justifyContent="center" align="center" minHeight="calc(100vh - 80px)">
      <Box width="50%">
        <Flex width="50%" flexDir="column" m="0 auto" gap={4} minHeight="300px">
          <Box>
            <Heading as="h1">Pharmacy Portal</Heading>
            <Text color="blackAlpha.500">Login to access internal resources</Text>
          </Box>

          <SigninForm />
        </Flex>
      </Box>

      <Flex width="50%">
        <Heading as="h1">Some cool image</Heading>
      </Flex>
    </Flex>
  )
}

Login.isPublic = true
Login.title = 'Login'
Login.renderHeader = false
