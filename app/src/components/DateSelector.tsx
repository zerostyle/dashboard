import { useCallback } from 'react'
import { useAppContext } from '../context/AppContext'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import format from 'date-fns/format'
import { FaCalendar } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { Icon } from '@chakra-ui/react'
//import 'react-date-picker/dist/DatePicker.css'
//import 'react-calendar/dist/Calendar.css'

const FORMAT = 'MM/dd/yyyy'

function findDate(collectionList: any[], date: Date) {
  const index = collectionList.findIndex((item) => {
    const timestamp = new Date(item?.mint?.transactionInfo?.blockTimestamp)
    return format(timestamp, FORMAT) === format(date, FORMAT)
  })
  return index
}

export const DateSelector = () => {
  const { loading, collectionList, index, setIndex, minDate, maxDate, error } = useAppContext()

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
    <>
      {/* {!loading && !error && (
        <DatePicker onChange={handleChange} value={value} minDate={new Date(minDate)} maxDate={new Date(maxDate)} />
      )} */}

      <DatePicker
        calendarIcon={<Icon as={FaCalendar} w={4} h={4} />}
        //clearIcon={<Icon as={MdCancel} w={5} h={5} mt="1px" />}
        clearIcon={null}
        onChange={handleChange}
        value={value}
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        showLeadingZeros
      />
    </>
  )
}
