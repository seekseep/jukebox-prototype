import { useMemo } from 'react'

export function useSelection (data, rowSelection) {
  return useMemo(() => {
    const selection = []

    for (let index in rowSelection) {
      if (!rowSelection[index] || !data[index]) continue
      selection.push({
        index: index,
        data : data[index]
      })
    }
    return  selection
  }, [data, rowSelection])
}
