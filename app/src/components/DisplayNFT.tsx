import { Box, Button, Center, Flex, Icon, Image, Text } from '@chakra-ui/react'
import React, { useCallback, useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import { motion } from 'framer-motion'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const MotionBox = motion(Box)

export function DisplayNFT() {
  const { collectionList, index, setIndex } = useAppContext()

  const [loaded, setLoaded] = useState<boolean>(false)
  const active = collectionList[index]

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
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
                  <Image
                    key={token?.metadata?.name}
                    className="keen-slider__slide"
                    src={token?.metadata?.image}
                    pos="relative"
                    w="70vmin"
                    h="70vmin"
                    objectFit={['cover', 'cover', 'contain']}
                    objectPosition="center"
                  />
                )
              })}
            <Image
              src="/loading-skull-noun.gif"
              pos="relative"
              w="70vmin"
              h="70vmin"
              objectFit={['cover', 'cover', 'contain']}
              objectPosition="center"
            />
          </Flex>
        </MotionBox>
      </Center>

      <Flex w="100%" flex={0} pb={4} px={4}>
        <Flex w="100%" justify="space-between" align="center">
          <Button onClick={handlePrev} w={50} h={50} borderRadius="full">
            <Icon as={FaChevronLeft} />
          </Button>

          <Text fontWeight="bold">{active?.token?.metadata?.name}</Text>

          <Button onClick={handleNext} w={50} h={50} borderRadius="full">
            <Icon as={FaChevronRight} />
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
