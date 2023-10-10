import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

export function Footer() {
  const actualYear = new Date().getFullYear()

  return (
    <Flex height="80px">
      <Flex
        flexDirection="column"
        justifyContent="center"
        position="absolute"
        bottom="0"
        padding={4}
        width="100%"
        sx={{
          p: {
            textAlign: 'center',
          },
        }}
      >
        <Text>Made with 💚</Text>
        <Text>
          © {actualYear}{' '}
          <Text as="span">
            <Link href="https://github.com/reisblucas">@reisblucas</Link>
          </Text>
          . All rights reserved.
        </Text>
      </Flex>
    </Flex>
  )
}
