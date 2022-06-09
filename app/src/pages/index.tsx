import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { ZDK, ZDKNetwork, ZDKChain } from '@zoralabs/zdk'
import { useEffect, useState } from 'react'
import { Collection } from '@zoralabs/zdk/dist/queries/queries-sdk'

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

const zdk = new ZDK(args) // All arguments are optional

const NOUNS = '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03'

function Index(props) {
  const [collection, setCollection] = useState<Collection>()

  useEffect(() => {
    const getCollection = async () => {
      const data = await zdk.collection({ address: NOUNS })
      setCollection(data)
    }

    getCollection()
  }, [])

  return (
    <Container flex={1}>
      <Hero title={collection?.name} />

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
