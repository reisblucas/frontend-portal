import { Flex, Heading } from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex justifyContent="center" align="center" height="100vh">
      <Heading as="h1">Some home page</Heading>
    </Flex>
  )
}

Home.title = 'Home'
