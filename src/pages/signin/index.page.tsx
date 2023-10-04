import SigninForm from '@/signin/components/SigninForm'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

export default function Login() {
  return (
    <Flex justifyContent="center" align="center" height="100vh">
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
