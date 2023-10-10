import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './styles'

export const ChakraCustomProvider = ({ children }: ChakraCustomProvider.Props) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export namespace ChakraCustomProvider {
  export type Props = {
    children: React.ReactNode
  }
}
