import { useCallback, useState, useMemo } from 'react'

export function useToggleState (defaultValue = false) {
  const [value, setValue] = useState(defaultValue)
  const toggle = useCallback(() => setValue(state => !state),[])
  return [value, toggle, setValue]
}

function keysToSelectionState (keys = [], defaultValue = false) {
  return keys.reduce((selection, key) => ({ ...selection, [key]: defaultValue }), [])
}

export function useSelectCollection (defaultState = {}) {
  const [selection, setSelection] = useState(defaultState)

  const getIsSelected = useCallback((key) => !!selection[key], [selection])

  const setItem = useCallback((key, value) => {
    setSelection(selection => ({
      ...selection,
      [key]: value
    }))
  }, [])

  const setAll = useCallback((value = false) => {
    setSelection(selection => {
      return Object.keys(selection).reduce((selection, key) => {
        return { ...selection, [key]: value }
      }, {})
    })
  }, [])

  const setItems = useCallback((keys, defaultValue = false) => {
    setSelection(keysToSelectionState(keys, defaultValue))
  }, [])

  const {
    isAllSelected,
    isSomeSelected,
    selectedKeys,
    selectedItems
  } = useMemo(() => {
    const selectedKeys = []
    const selectedItems = []
    const entries = Object.entries(selection)
    let isAllSelected = entries.length > 0
    let isSomeSelected = false

    for (let [key, item] of entries) {
      if (!!item)  {
        selectedItems.push(item)
        selectedKeys.push(key)
        isSomeSelected = true
        continue
      }
      isAllSelected = false
    }

    return { isAllSelected, isSomeSelected, selectedKeys, selectedItems }
  }, [selection])

  return {
    setAll,
    setItem,
    getIsSelected,
    setSelection,
    setItems,
    selection,
    selectedItems,
    isAllSelected,
    isSomeSelected,
    selectedKeys
  }
}
