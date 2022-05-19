import { useCallback, useState, useMemo } from 'react'

export function useToggleState (defaultValue = false) {
  const [value, setValue] = useState(defaultValue)
  const toggle = useCallback(() => setValue(state => !state),[])
  return [value, toggle, setValue]
}

function keysToSelectionState (keys = [], defaultValue = false) {
  return keys.reduce((selection, key) => ({ ...selection, [key]: defaultValue }), [])
}

export function useSelectCollection (defaultKeys = []) {
  const [selection, setSelection] = useState(keysToSelectionState(defaultKeys))

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

  const setKeys = useCallback((keys, defaultValue = false) => {
    setSelection(keysToSelectionState(keys, defaultValue))
  }, [])

  const {
    isAllSelected,
    isSomeSelected,
    selectedKeys
  } = useMemo(() => {
    const selectedKeys = []
    let isAllSelected = true
    let isSomeSelected = false

    for (let [key, value] of Object.entries(selection)) {
      if (value)  {
        selectedKeys.push(key)
        isSomeSelected = true
        continue
      }
      isAllSelected = false
    }

    return { isAllSelected, isSomeSelected, selectedKeys }
  }, [selection])

  return {
    setAll,
    setItem,
    getIsSelected,
    setSelection,
    setKeys,
    selection,
    isAllSelected,
    isSomeSelected,
    selectedKeys
  }
}
