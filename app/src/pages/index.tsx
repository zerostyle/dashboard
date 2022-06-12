import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { ZDK, ZDKNetwork, ZDKChain } from '@zoralabs/zdk'
import { useEffect, useCallback } from 'react'
import { useAppContext } from '../context/AppContext'
import { getNounsData } from '../fetchers/zoraFetcher'
import { Stack } from '@chakra-ui/react'

const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Mainnet,
}

const API_ENDPOINT = 'https://api.zora.co/graphql'
const args = {
  endPoint: API_ENDPOINT,
  networks: [networkInfo],
  apiKey: process.env.API_KEY,
}

const zdk = new ZDK(args)

function Index(props) {
  const { activeCollectionIndex, setCollection, setLoading, setError } = useAppContext()

  const handleError = useCallback(
    (error) => {
      setError(true)
    },
    [setError],
  )

  useEffect(() => {
    const getCollection = async () => {
      setLoading(true)

      const nouns = await getNounsData({ onError: handleError })

      if (!!nouns) setCollection({ tokens: nouns })
      setLoading(false)
    }

    getCollection()
  }, [activeCollectionIndex])

  return (
    <Stack flex={1} align="center" w="100%" h="100%" gap={4}>
      <Header />

      <Main />
    </Stack>
  )
}

export async function getStaticProps(context) {
  return {
    props: {},
  }
}

export default Index
