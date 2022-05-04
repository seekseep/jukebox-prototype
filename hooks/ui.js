import { useCallback, useState } from 'react'

export function useToggleState (defaultValue = false) {
  const [value, setValue] = useState(defaultValue)
  const toggle = useCallback(() => setValue(state => !state),[])

  return [value, toggle, setValue]
}
