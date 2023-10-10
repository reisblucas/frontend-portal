import { Fragment } from 'react'

import { Footer, Header } from './components'

export function Layout({ children, renderHeader = true }: Layout.Props) {
  return (
    <Fragment>
      {renderHeader && <Header />}
      {children}
      <Footer />
    </Fragment>
  )
}

export namespace Layout {
  export interface Props {
    children: React.ReactNode
    renderHeader?: boolean
  }
}
