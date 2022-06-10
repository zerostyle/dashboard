import { Box, Button, Center, Flex, Icon, Image, Spinner, Text } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const MotionImage = motion(Image)

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export function DisplayNFT({ initial = 0 }: { initial?: number }) {
  const { collection, loading } = useAppContext()

  const [loaded, setLoaded] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial,
    loop: true,
    slideChanged(slider) {
      setIndex(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  const handlePrev = useCallback(
    (e) => {
      e.stopPropagation()
      if (slider) slider.current?.prev()
    },
    [slider],
  )

  const handleNext = useCallback(
    (e) => {
      e.stopPropagation()
      if (slider) slider.current?.next()
    },
    [slider],
  )

  console.log(collection?.tokens)

  return (
    <Center position="relative" w="100%" h="100%">
      <Box position="relative" overflow="hidden" w="100%" h="100%" maxW="70vmin" maxH="70vmin">
        {/* <Center pos="absolute" inset={0}>
          <Spinner size="xl" />
        </Center> */}

        <Flex ref={sliderRef} className="keen-slider">
          {!!collection?.tokens?.length &&
            collection.tokens
              .reverse()
              .map(({ token }, i) => (
                <MotionImage
                  key={i}
                  className="keen-slider__slide"
                  pos="relative"
                  src={token?.image?.url}
                  w="70vmin"
                  h="70vmin"
                  objectFit="cover"
                  objectPosition="center"
                />
              ))}
        </Flex>
      </Box>

      <Flex pos="absolute" w="100%" bottom={0}>
        <Flex w="100%" justify="space-between" align="center">
          <Button onClick={handlePrev}>
            <Icon as={FaChevronLeft} />
          </Button>
          {/* <Text>{token?.name}</Text> */}
          <Button onClick={handleNext}>
            <Icon as={FaChevronRight} />
          </Button>
        </Flex>
      </Flex>
    </Center>
  )
}
