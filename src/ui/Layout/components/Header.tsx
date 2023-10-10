import { Flex, Heading } from '@chakra-ui/react'
import { DrawerNavigation } from './DrawerNavigation'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <Flex
      justifyContent="center"
      minHeight="50px"
      minWidth="full"
      alignItems="center"
      boxShadow="rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;"
      position="sticky"
      top={0}
      backgroundColor="white"
    >
      <Flex
        sx={{
          a: {
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          },
        }}
      >
        <Link href="/medications">
          <Image src="/pharmacy.png" alt="business logo" width={32} height={32} />
          <Heading as="h2" fontFamily="Times New Roman" fontWeight="thin" size={{ base: 'sm', md: 'md' }}>
            pharmacy
          </Heading>
        </Link>
      </Flex>

      <DrawerNavigation />
    </Flex>
  )
}
