import type { AppProps } from 'next/app'

import { ChakraCustomProvider } from '@/infra/chakra/provider'
import { QueryClientProvider } from '@/infra/tanstack'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraCustomProvider>
      <QueryClientProvider>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraCustomProvider>
  )
}

export default MyApp
