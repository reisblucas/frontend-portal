import type { AppProps } from 'next/app'

import { ChakraCustomProvider } from '@/infra/chakra/provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraCustomProvider>
      <Component {...pageProps} />
    </ChakraCustomProvider>
  )
}

export default MyApp
