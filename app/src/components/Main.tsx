import { Center, Heading, Spinner } from '@chakra-ui/react'
import { useAppContext } from '../context/AppContext'
import { DisplayNFT } from './DisplayNFT'
import { DateSelector } from './DateSelector'

export const Main = () => {
  const { loading, error } = useAppContext()

  return (
    <>
      {loading && (
        <Center pos="absolute" inset={0}>
          <Spinner size="xl" />
        </Center>
      )}

      {error && (
        <Heading textAlign="center">
          Something went wrong.
          <br />
          Please try again later.
        </Heading>
      )}

      {!loading && !error && <DisplayNFT />}
    </>
  )
}
