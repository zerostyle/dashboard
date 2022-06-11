import { ChakraProvider } from '@chakra-ui/react'
import { AppProvider } from '../context/AppContext'
import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  )
}

export default MyApp
