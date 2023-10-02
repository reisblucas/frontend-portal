import { ChakraProvider } from '@chakra-ui/react'

export const ChakraCustomProvider = ({ children }: ChakraCustomProvider.Props) => {
  return <ChakraProvider>{children}</ChakraProvider>
}

export namespace ChakraCustomProvider {
  export type Props = {
    children: React.ReactNode
  }
}
