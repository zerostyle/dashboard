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
  const { collectionList, loading } = useAppContext()

  const [loaded, setLoaded] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)
  const active = collectionList[index]

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

  return (
    <Center position="relative" w="100%" h="100%">
      <Box position="relative" overflow="hidden" w="100%" h="100%" maxW="70vmin" maxH="70vmin">
        <Flex ref={sliderRef} className="keen-slider">
          {!!collectionList?.length &&
            collectionList.map(({ token }, i) => {
              return (
                <MotionImage
                  key={token?.metadata?.name}
                  className="keen-slider__slide"
                  src={token?.metadata?.image}
                  pos="relative"
                  w="70vmin"
                  h="70vmin"
                  objectFit="cover"
                  objectPosition="center"
                />
              )
            })}
        </Flex>
      </Box>

      <Flex pos="absolute" w="100%" bottom={0}>
        <Flex w="100%" justify="space-between" align="center">
          <Button onClick={handlePrev}>
            <Icon as={FaChevronLeft} />
          </Button>
          <Text>{active?.token?.metadata?.name}</Text>
          <Button onClick={handleNext}>
            <Icon as={FaChevronRight} />
          </Button>
        </Flex>
      </Flex>
    </Center>
  )
}
