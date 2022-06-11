import { first, last, sortBy } from 'lodash'
import { createContext, useContext, useMemo, useState } from 'react'
export const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [activeCollectionIndex, setActiveCollectionIndex] = useState<number>(0)
  const [index, setIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [collection, setCollection] = useState<any>()

  const collectionList = useMemo(() => {
    if (!collection) return []
    const list = Object.keys(collection?.tokens).map((id) => first(collection?.tokens[id]))
    return sortBy(list, ['mint.transactionInfo.blockTimestamp'])
  }, [collection])

  const minDate = useMemo(() => first(collectionList)?.mint?.transactionInfo?.blockTimestamp, [collectionList])
  const maxDate = useMemo(() => last(collectionList)?.mint?.transactionInfo?.blockTimestamp, [collectionList])

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
    ],
  )
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
