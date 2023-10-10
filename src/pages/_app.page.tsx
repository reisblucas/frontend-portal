import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

import { ChakraCustomProvider } from '@/infra/chakra/provider'
import { QueryClientProvider } from '@/infra/tanstack'
import { Auth } from '@/infra/nextauth'
import { Layout } from '@/ui'

interface MyAppProps {
  Component: AppProps['Component'] & {
    isPublic: boolean
    title: string
    content?: string
    renderHeader?: boolean
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
          <Layout renderHeader={Component.renderHeader}>
            {Component.isPublic ? (
              <Component {...pageProps} />
            ) : (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            )}
          </Layout>
        </SessionProvider>
      </QueryClientProvider>
    </ChakraCustomProvider>
  )
}

export default MyApp
