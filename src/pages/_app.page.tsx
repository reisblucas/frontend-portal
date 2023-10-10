import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

import { ChakraCustomProvider } from '@/infra/chakra/provider'
import { QueryClientProvider } from '@/infra/tanstack'
import { Auth } from '@/infra/nextauth'
import { Footer } from '@/ui'

interface MyAppProps {
  Component: AppProps['Component'] & {
    isPublic: boolean
    title: string
    content?: string
  }
  pageProps: AppProps['pageProps']
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <ChakraCustomProvider>
      <Head>
        {Component.title && <title>Pharmacy - {Component.title}</title>}
        {Component.content && <meta name="Pharmacy Portal" content={Component.content} />}
        <link rel="icon" href="/pharmacy.ico" />
      </Head>
      <QueryClientProvider>
        <SessionProvider session={pageProps.session}>
          {Component.isPublic ? (
            <Component {...pageProps} />
          ) : (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          )}
          <Footer />
        </SessionProvider>
      </QueryClientProvider>
    </ChakraCustomProvider>
  )
}

export default MyApp
