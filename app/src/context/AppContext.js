import { first, last, sortBy } from 'lodash'
import { createContext, useContext, useMemo, useState } from 'react'
export const AppContext = createContext(null)

const initialized = false

export const AppProvider = ({ children }) => {
  const [activeCollectionIndex, setActiveCollectionIndex] = useState(0)
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [collection, setCollection] = useState()
  const [error, setError] = useState(false)

  const collectionList = useMemo(() => {
    if (!collection) return []
    const list = Object.keys(collection?.tokens).map((id) => first(collection?.tokens[id]))
    const sorted = sortBy(list, ['mint.transactionInfo.blockTimestamp'])
    if (!initialized) {
      setIndex(sorted.length - 1)
    }

    return sorted
  }, [collection])

  const minDate = useMemo(() => {
    const firstDate = first(collectionList)
    return firstDate?.mint.transactionInfo.blockTimestamp
  }, [collectionList])

  const maxDate = useMemo(() => {
    const lastDate = last(collectionList)
    return lastDate?.mint.transactionInfo.blockTimestamp
  }, [collectionList])

  const value = useMemo(
    () => ({
      activeCollectionIndex,
      setActiveCollectionIndex,
      collection,
      collectionList,
      setCollection,
      loading,
      setLoading,
      index,
      setIndex,
      minDate,
      maxDate,
      error,
      setError,
    }),
    [
      activeCollectionIndex,
      setActiveCollectionIndex,
      collection,
      collectionList,
      setCollection,
      loading,
      setLoading,
      index,
      setIndex,
      minDate,
      maxDate,
      error,
      setError,
    ],
  )
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
