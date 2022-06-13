import { Box, Button, Center, Flex, Icon, Image, Text } from '@chakra-ui/react'
import React, { useCallback, useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const MotionBox = motion(Box)
const MotionImage = motion(Image)

export function DisplayNFT() {
  const { collectionList, index, setIndex } = useAppContext()

  const [loaded, setLoaded] = useState<boolean>(false)
  const active = collectionList[index]

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: {
      origin: 'center',
    },
    breakpoints: {
      '(min-width: 1000px)': {
        slides: { perView: 2, spacing: 15, origin: 'center' },
      },
      '(min-width: 1200px)': {
        slides: { perView: 2, spacing: 100, origin: 'center' },
      },
    },
    slideChanged: (slider) => handleSlideChanged(slider.track.details.rel),
    created() {
      setLoaded(true)
    },
  })

  const sliderIndex = slider.current?.track?.details?.rel

  const handleSlideChanged = useCallback((i) => setIndex(i), [setIndex])

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

  const handleClick = useCallback(
    (newIndex) => {
      slider.current?.moveToIdx(newIndex)
    },
    [slider],
  )

  useEffect(() => {
    if (sliderIndex !== index) slider.current?.moveToIdx(index)
  }, [slider, index, sliderIndex])

  return (
    <>
      <Center position="relative" w="100%" flex={1}>
        <MotionBox
          position="relative"
          overflow="hidden"
          w="100%"
          h="100%"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Flex ref={sliderRef} className="keen-slider">
            {!!collectionList?.length &&
              collectionList.map(({ token }, i) => {
                return (
                  <MotionImage
                    key={token?.metadata?.name}
                    className="keen-slider__slide"
                    src={token?.metadata?.image}
                    pos="relative"
                    w="100%"
                    h="100%"
                    maxW="55vmin"
                    maxH="55vmin"
                    objectFit={['cover', 'cover', 'contain']}
                    objectPosition="center"
                    cursor="pointer"
                    animate={{ opacity: i === index ? 1 : 0.2 }}
                    whileHover={{ opacity: i === index ? 1 : 0.6 }}
                    onClick={() => handleClick(i)}
                    borderRadius={[0, 0, '12px']}
                    css={{ aspectRatio: 1 }}
                  />
                )
              })}
          </Flex>
        </MotionBox>
      </Center>

      <Flex w="100%" flex={0} pb={4} px={4}>
        <Flex w="100%" justify="space-between" align="center">
          <Button onClick={handlePrev} w={50} h={50} borderRadius="full">
            <Icon as={FaChevronLeft} />
          </Button>

          <Text fontWeight="bold" fontSize={24}>
            {active?.token?.metadata?.name}
          </Text>

          <Button onClick={handleNext} w={50} h={50} borderRadius="full">
            <Icon as={FaChevronRight} />
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
