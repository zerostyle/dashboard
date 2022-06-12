import { Flex, Icon } from '@chakra-ui/react'
import { collections } from '../constants/collections'
import { useAppContext } from '../context/AppContext'
//import { DarkModeSwitch } from './DarkModeSwitch'
import { DateSelector } from './DateSelector'

export function Header() {
  const { activeCollectionIndex } = useAppContext()

  return (
    <Flex as="header" pos="relative" justify="space-around" w="100%" py={[4, 4]} px={4}>
      <Icon as={collections[activeCollectionIndex].icon} width="auto" h="80px" />

      <Flex gap={6} alignItems="center">
        <DateSelector />
        {/* <DarkModeSwitch /> */}
      </Flex>
    </Flex>
  )
}
