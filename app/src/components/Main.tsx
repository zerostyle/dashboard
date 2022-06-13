import { AspectRatio, Box, Center, Heading, Image } from '@chakra-ui/react'
import { useAppContext } from '../context/AppContext'
import { DisplayNFT } from './DisplayNFT'
import { motion } from 'framer-motion'

const MotionCenter = motion(Center)

export const Main = () => {
  const { collectionList, loading, error } = useAppContext()

  return (
    <>
      {error && (
        <Heading textAlign="center">
          Something went wrong.
          <br />
          Please try again later.
        </Heading>
      )}

      {!loading && !error && <DisplayNFT />}

      {loading && (
        <>
          <MotionCenter
            position="relative"
            w="100%"
            h="100%"
            flex={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AspectRatio ratio={1}>
              <Image
                src="/loading-skull-noun.gif"
                pos="relative"
                w="100%"
                h="100%"
                maxW="70vmin"
                maxH="70vmin"
                objectFit={['cover', 'cover', 'contain']}
                objectPosition="center"
                bg="blackAlpha.500"
                borderRadius={12}
              />
            </AspectRatio>
          </MotionCenter>

          <Box h={50} />
        </>
      )}
    </>
  )
}
