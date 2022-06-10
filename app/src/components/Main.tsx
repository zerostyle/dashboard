import { Center, Spinner, Stack, StackProps } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useAppContext } from '../context/AppContext'
import { DisplayNFT } from './DisplayNFT'

export const Main = (props: StackProps) => {
  const { setActiveCollectionIndex, loading } = useAppContext()

  const handleCollectionChange = useCallback(
    (e: any) => {
      if (!!e.target.value) setActiveCollectionIndex(e.target.value)
    },
    [setActiveCollectionIndex],
  )

  return (
    <Stack align="center" width="100%" maxWidth={1400} px={4} gap={4} {...props}>
      {/* <Select maxW={300} placeholder="Select collection" onChange={handleCollectionChange} defaultValue={0}>
        {collections.map(({ id, name }, i) => (
          <option key={id} value={i}>
            {name}
          </option>
        ))}
      </Select> */}

      {loading && (
        <Center pos="absolute" inset={0}>
          <Spinner size="xl" />
        </Center>
      )}

      {!loading && <DisplayNFT />}
    </Stack>
  )
}
