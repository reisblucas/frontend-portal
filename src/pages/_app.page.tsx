import type { AppProps } from 'next/app'

import { ChakraCustomProvider } from '@/infra/chakra/provider'
import { QueryClientProvider } from '@/infra/tanstack'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraCustomProvider>
      <SessionProvider>
        <QueryClientProvider>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </ChakraCustomProvider>
  )
}

export default MyApp
