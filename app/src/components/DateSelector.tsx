import { useCallback } from 'react'
import { useAppContext } from '../context/AppContext'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import format from 'date-fns/format'
import { FaCalendar } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'

const FORMAT = 'MM/dd/yyyy'

function findDate(collectionList: any[], date: Date) {
  const index = collectionList.findIndex((item) => {
    const timestamp = new Date(item?.mint?.transactionInfo?.blockTimestamp)
    return format(timestamp, FORMAT) === format(date, FORMAT)
  })
  return index
}

export const DateSelector = () => {
  const { collectionList, index, setIndex, minDate, maxDate, error } = useAppContext()

  const active = collectionList[index]
  const date = active?.mint?.transactionInfo?.blockTimestamp
  const value = date ? new Date(date) : new Date()

  const handleChange = useCallback(
    (value) => {
      const newIndex = findDate(collectionList, new Date(value))
      if (newIndex !== -1) setIndex(newIndex)
    },
    [collectionList, setIndex],
  )

  return (
    <DatePicker
      calendarIcon={<Icon as={FaCalendar} w={4} h={4} />}
      clearIcon={null}
      onChange={handleChange}
      value={value}
      minDate={new Date(minDate)}
      maxDate={new Date(maxDate)}
      showLeadingZeros
    />
  )
}
