import type { AppProps } from 'next/app'

import { ChakraCustomProvider } from '@/infra/chakra/provider'
import { QueryClientProvider } from '@/infra/tanstack'
import { SessionProvider } from 'next-auth/react'
import { Auth } from '@/infra/nextauth'

interface MyAppProps {
  Component: AppProps['Component'] & {
    isPublic: boolean
  }
  pageProps: AppProps['pageProps']
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <ChakraCustomProvider>
      <QueryClientProvider>
        <SessionProvider session={pageProps.session}>
          {Component.isPublic ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
      </QueryClientProvider>
    </ChakraCustomProvider>
  )
}

export default MyApp
