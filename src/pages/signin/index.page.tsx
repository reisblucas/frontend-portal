import SigninForm from '@/signin/components/SigninForm'
import { Box, Flex, Heading, Hide, Image, Text } from '@chakra-ui/react'
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
    <Flex flexDir="row" justifyContent="center" align="center" minHeight="calc(100vh - 80px)">
      <Box width={{ base: '95%', md: '60%', xl: '30%' }}>
        <Flex
          width="80%"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          m="0 auto"
          gap={4}
          minHeight="450px"
          padding={4}
          borderRadius="100px"
          boxShadow="rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;"
        >
          <Box>
            <Heading as="h1" textAlign="center">
              Pharmacy Portal
            </Heading>
            <Text color="blackAlpha.500" textAlign="center">
              Login to access internal resources
            </Text>
          </Box>

          <SigninForm />
        </Flex>
      </Box>

      <Hide below="md">
        <Flex width="50%" overflow="hidden" position="relative" justifyContent="center">
          <Box
            minWidth="50%"
            minHeight="120%"
            bgColor="white"
            position="absolute"
            left={-100}
            top={-50}
            borderRightRadius={300}
          />
          <Image
            src="/pills.avif"
            alt="pills dropped on table"
            objectFit="cover"
            width={512}
            borderRightRadius="full"
          />
        </Flex>
      </Hide>
    </Flex>
  )
}

Login.isPublic = true
Login.title = 'Login'
Login.renderHeader = false
