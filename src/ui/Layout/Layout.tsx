import { Fragment } from 'react'
import { Box } from '@chakra-ui/react'

import { Footer, Header } from './components'

export function Layout({ children, renderHeader = true }: Layout.Props) {
  return (
    <Fragment>
      {renderHeader && <Header />}
      <Box padding={4} justifyContent="center">
        {children}
      </Box>
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
