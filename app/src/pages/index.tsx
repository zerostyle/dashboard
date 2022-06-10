import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { ZDK, ZDKNetwork, ZDKChain } from '@zoralabs/zdk'
import { useEffect, useState } from 'react'
import { collections } from '../constants/collections'
import { useAppContext } from '../context/AppContext'

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
  const { activeCollectionIndex, collection, setCollection, setLoading } = useAppContext()

  useEffect(() => {
    const getCollection = async () => {
      setLoading(true)
      const data = await zdk.collection({ address: collections[activeCollectionIndex].address })

      const tokens = await zdk.tokens({
        where: { collectionAddresses: [collections[activeCollectionIndex].address] },
      })

      console.log('tokens: ', tokens)

      setCollection({ ...data, tokens: tokens?.tokens?.nodes })
      setLoading(false)
    }

    getCollection()
  }, [activeCollectionIndex])

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
