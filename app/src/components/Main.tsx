import { Center, Spinner, Stack, StackProps } from '@chakra-ui/react'
import { useMemo, useState, useCallback } from 'react'
import { useAppContext } from '../context/AppContext'
import { DisplayNFT } from './DisplayNFT'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import format from 'date-fns/format'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

const FORMAT = 'MM/dd/yyyy'

function findDate(collectionList: any[], date: Date) {
  const index = collectionList.findIndex((item) => {
    const timestamp = new Date(item?.mint?.transactionInfo?.blockTimestamp)
    return format(timestamp, FORMAT) === format(date, FORMAT)
  })
  return index
}

export const Main = (props: StackProps) => {
  const { loading, collectionList, index, setIndex, minDate, maxDate } = useAppContext()
  const [value, onChange] = useState(new Date())

  const handleChange = useCallback(
    (value) => {
      console.log('handleChange')
      const newIndex = findDate(collectionList, new Date(value))
      if (newIndex !== -1) setIndex(newIndex)
      onChange(value)
    },
    [collectionList, setIndex, onChange],
  )

  return (
    <Stack align="center" width="100%" maxWidth={1400} px={4} gap={4} {...props}>
      {loading && (
        <Center pos="absolute" inset={0}>
          <Spinner size="xl" />
        </Center>
      )}

      {!loading && (
        <>
          <DatePicker onChange={handleChange} value={value} minDate={new Date(minDate)} maxDate={new Date(maxDate)} />

          <DisplayNFT />
        </>
      )}
    </Stack>
  )
}
