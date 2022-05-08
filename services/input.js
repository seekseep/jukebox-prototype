import { format } from 'date-fns'

export function getDatetimeLocalValue(date = new Date()) {
  return format(date, 'yyyy-MM-dd\'T\'HH:mm')
}

export function getDateValue(date = new Date()) {
  return format(date, 'yyyy-MM-dd')
}

export function getTimeValue(date = new Date()) {
  return format(date, 'HH:mm')
}
