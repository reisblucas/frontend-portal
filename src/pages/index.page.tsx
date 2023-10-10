import { Button, Flex, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import Router from 'next/router'

export default function Home() {
  return (
    <Flex justifyContent="center" align="center" minHeight="calc(100vh - 80px)" flexDir="column" gap={4}>
      <Image src="/pharmacy.png" alt="business logo" width={256} height={256} />
      <Heading as="h1" textAlign="center">
        Welcome to Pharmacy Portal
      </Heading>

      <Flex gap={4} mt={4}>
        <Button variant="solid" colorScheme="green" onClick={() => Router.push('/signin')}>
          Sign In
        </Button>
        <Button aria-disabled>Create Account</Button>
      </Flex>
    </Flex>
  )
}

Home.title = 'Home'
Home.isPublic = true
Home.renderHeader = false
