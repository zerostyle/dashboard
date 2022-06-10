import { first } from 'lodash'
import { createContext, useContext, useMemo, useState } from 'react'
export const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [activeCollectionIndex, setActiveCollectionIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [collection, setCollection] = useState<any>()
  const collectionList = useMemo(
    () => (!!collection ? Object.keys(collection?.tokens).map((id) => first(collection?.tokens[id])) : []),
    [collection],
  )

  const value = useMemo(
    () => ({
      activeCollectionIndex,
      setActiveCollectionIndex,
      collection,
      collectionList,
      setCollection,
      loading,
      setLoading,
    }),
    [activeCollectionIndex, setActiveCollectionIndex, collection, collectionList, setCollection, loading, setLoading],
  )
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
