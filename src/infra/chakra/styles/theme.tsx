import { extendTheme } from '@chakra-ui/react'
import { Text } from './components'

export const theme = extendTheme({
  config: {
    cssVarPrefix: 'pharmacy-portal',
  },
  components: {
    Text,
  },
  fonts: {
    // heading: '', // to be defined
    // body: '', // to be defined
  },
})
