import { Flex, Icon } from '@chakra-ui/react'
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
      py={[16, 10]}
    >
      <Icon as={collections[activeCollectionIndex].icon} width="100%" h="100px" />
    </Flex>
  )
}
