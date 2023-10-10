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
        boxShadow="rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 5px 0px 5px 5px;"
      >
        <Text>Made with 💚</Text>
        <Text>
          © {actualYear}{' '}
          <Text
            as="span"
            sx={{
              a: {
                textDecoration: 'underline',
              },
            }}
          >
            <Link href="https://github.com/reisblucas">@reisblucas</Link>
          </Text>
          . All rights reserved.
        </Text>
      </Flex>
    </Flex>
  )
}
