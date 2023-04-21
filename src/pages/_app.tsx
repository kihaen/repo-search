import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { extendBaseTheme, ChakraProvider } from '@chakra-ui/react'

const theme = extendBaseTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.200',
        color: 'white',
      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
})
export default function App({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
  )
}
