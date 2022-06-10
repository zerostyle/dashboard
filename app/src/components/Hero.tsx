import { Flex, Spinner, Icon, Center } from '@chakra-ui/react'
import { collections } from '../constants/collections'
import { useAppContext } from '../context/AppContext'

export function Hero({ title }: { title: string }) {
  const { activeCollectionIndex, loading } = useAppContext()

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flex="1"
      bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
      bgClip="text"
      pt={10}
    >
      {loading && (
        <Center w="100px" h="100px">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      )}
      {!loading && <Icon as={collections[activeCollectionIndex].icon} width="100%" h="100px" />}
    </Flex>
  )
}
