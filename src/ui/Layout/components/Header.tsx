import { Box, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { DrawerNavigation } from './DrawerNavigation'

export function Header() {
  return (
    <Flex
      justifyContent="center"
      minHeight="50px"
      alignItems="center"
      position="relative"
      boxShadow="rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
    >
      <Box width="100%" textAlign="center">
        <Link href="/medications">
          <Heading as="h2" fontFamily="Times New Roman" fontWeight="thin" size={{ base: 'sm', md: 'md' }}>
            pharmacy
          </Heading>
        </Link>
      </Box>

      <DrawerNavigation />
    </Flex>
  )
}
