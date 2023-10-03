import Head from 'next/head'

export function HeadFactory({ title, content }: HeadFactory.Prop) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="Pharmacy Portal" content={content} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export namespace HeadFactory {
  export interface Prop {
    title: string
    content: string
  }
}
