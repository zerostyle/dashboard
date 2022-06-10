import { Box, Button, Center, Flex, Icon, Image, Spinner, Text } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from 'popmotion'

const MotionImage = motion(Image)

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export function DisplayNFT() {
  const { collection, loading } = useAppContext()
  const [[page, direction], setPage] = useState([0, 0])

  const imageIndex = wrap(0, collection?.tokens?.length, page)

  const token = collection?.tokens[imageIndex]?.token

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const handleNext = useCallback(() => {
    paginate(1)
  }, [paginate])

  const handlePrev = useCallback(() => {
    paginate(-1)
  }, [paginate])

  return (
    <Center position="relative" w="100%" h="100%">
      <Box position="relative" overflow="hidden" w="100%" h="100%" maxW="70vmin" maxH="70vmin">
        {/* <Center pos="absolute" inset={0}>
          <Spinner size="xl" />
        </Center> */}

        <AnimatePresence initial={false} custom={direction}>
          {!loading && (
            <MotionImage
              pos="relative"
              key={page}
              src={token?.image?.url}
              w="100%"
              h="100%"
              objectFit="cover"
              objectPosition="center"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              style={{
                mixBlendMode: 'multiply',
              }}
            />
          )}
        </AnimatePresence>
      </Box>

      {!loading && (
        <Flex pos="absolute" w="100%" bottom={0}>
          <Flex w="100%" justify="space-between" align="center">
            <Button onClick={handlePrev}>
              <Icon as={FaChevronLeft} />
            </Button>
            <Text>{token?.name}</Text>
            <Button onClick={handleNext}>
              <Icon as={FaChevronRight} />
            </Button>
          </Flex>
        </Flex>
      )}
    </Center>
  )
}
