import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { ZDK, ZDKNetwork, ZDKChain } from '@zoralabs/zdk'
import { useEffect, useCallback } from 'react'
import { useAppContext } from '../context/AppContext'
import { getNounsData } from '../fetchers/zoraFetcher'

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
  const { activeCollectionIndex, collection, setCollection, setLoading, setError } = useAppContext()

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
    <Container flex={1}>
      <Hero />

      <Main></Main>

      <DarkModeSwitch />

      <Footer />
    </Container>
  )
}

export async function getStaticProps(context) {
  return {
    props: {},
  }
}

export default Index
