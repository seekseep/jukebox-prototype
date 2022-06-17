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

export function getWeekValue (date = new Date())  {
  return format(date, 'yyyy-\'W\'w')
}
export function getMonthValue (date = new Date())  {
  return format(date, 'yyyy-MM')
}

export function getOption(value, options, defaultValues) {
  const option = options.find(option => option.value === value)

  if (!option) {
    return defaultValues || options[0]
  }

  return option
}
