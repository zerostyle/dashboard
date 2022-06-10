import { Grid, GridItem, Select, Stack, StackProps } from '@chakra-ui/react'
import { collections } from '../constants/collections'
import { useCallback } from 'react'
import { useAppContext } from '../context/AppContext'

const HEIGHT = 300

export const Main = (props: StackProps) => {
  const { setActiveCollectionIndex } = useAppContext()

  const handleCollectionChange = useCallback(
    (e: any) => {
      if (!!e.target.value) setActiveCollectionIndex(e.target.value)
    },
    [setActiveCollectionIndex],
  )

  return (
    <Stack align="center" width="100%" maxWidth={1400} px={4} gap={10} {...props}>
      <Select maxW={300} placeholder="Select collection" onChange={handleCollectionChange} defaultValue={0}>
        {collections.map(({ id, name }, i) => (
          <option key={id} value={i}>
            {name}
          </option>
        ))}
      </Select>

      <Grid w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(12, 1fr)" gap={4}>
        <GridItem h={HEIGHT} colSpan={3} bg="tomato" />
        <GridItem h={HEIGHT} colSpan={9} bg="papayawhip" />
        <GridItem h={HEIGHT} colSpan={6} bg="papayawhip" />
        <GridItem h={HEIGHT} colSpan={6} bg="papayawhip" />
        <GridItem h={HEIGHT} colSpan={8} bg="papayawhip" />
        <GridItem h={HEIGHT} colSpan={4} bg="purple.900" />
        <GridItem h={HEIGHT} colSpan={12} bg="papayawhip" />
      </Grid>
    </Stack>
  )
}
