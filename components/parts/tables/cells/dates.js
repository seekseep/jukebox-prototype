import { format, isValid } from 'date-fns'

export function DateCell ({ getValue }) {
  const date = getValue()
  if (!isValid(date)) return null

  return format(date, 'yyyy年MM月dd日')
}

export function DateTimeCell ({ getValue }) {
  const date = getValue()
  if (!isValid(date)) return null

  return format(date, 'yyyy年MM月dd日 HH:ss')
}

export function TimeCell ({ getValue }) {
  const date = getValue()
  if (!isValid(date)) return null

  return format(date, 'HH:ss')
}
