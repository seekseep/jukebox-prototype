import { sortingFns } from '@tanstack/react-table'
import {
  rankItem,
  compareItems,
  rankings,
} from '@tanstack/match-sorter-utils'

export function fuzzyFilter (row, columnId, value, addMeta) {
  const itemRank = rankItem(row.getValue(columnId), value, {
    threshold: rankings.MATCHES,
  })
  addMeta(itemRank)
  return itemRank.passed
}


export function fuzzySort (rowA, rowB, columnId) {
  let dir = 0
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId],
      rowB.columnFiltersMeta[columnId]
    )
  }
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}
