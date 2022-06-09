import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { ZDK, ZDKNetwork, ZDKChain } from '@zoralabs/zdk'
import { Heading } from '@chakra-ui/react'

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
  console.log('props: ', props.collection)

  return (
    <Container flex={1}>
      <Hero title={props?.collection?.name} />

      <Main></Main>

      <DarkModeSwitch />

      <Footer />
    </Container>
  )
}

export async function getStaticProps(context) {
  const collection = await zdk.collection({ address: NOUNS })

  return {
    props: { collection }, // will be passed to the page component as props
  }
}

export default Index
