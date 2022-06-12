import { format, getDate, getMonth, getYear, add, nextSunday } from 'date-fns'
import locale from 'date-fns/locale/ja'

export function getLessonDateLabel(lesson) {
  const { startedAt } = lesson
  if (!startedAt) return '不明'
  return format(startedAt, 'yyyy年MM月dd日 HH:mm')
}

export function getEventDateDurationLabel(startedAt, finishedAt, isAllDay) {
  if (!finishedAt) {
    return `${format(startedAt, 'yyyy年MM月dd日')}${isAllDay ? ' 〜' : ''}`
  }

  if (getYear(startedAt) !== getYear(finishedAt)) {
    return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(startedAt, 'yyyy年MM月dd日')}`
  }

  if (getMonth(startedAt) !== getMonth(finishedAt)) {
    return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'MM月dd日')}`
  }

  if (getDate(startedAt) !== getDate(finishedAt)) {
    return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'dd日')}`
  }

  return `${format(startedAt, 'yyyy年MM月dd日')}`
}

export function getEventDurationLabel(startedAt, finishedAt, isAllDay = false) {
  if (!finishedAt) return `${format(startedAt, 'yyyy年MM月dd日')}`

  if (getYear(startedAt) !== getYear(finishedAt)) {
    if (isAllDay) return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'yyyy年MM月dd日')}`
    return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'yyyy年MM月dd日 HH:mm')}`
  }

  if (getMonth(startedAt) !== getMonth(finishedAt)) {
    if (isAllDay) return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'MM月dd日')}`
    return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'MM月dd日 HH:mm')}`
  }

  if (getDate(startedAt) !== getDate(finishedAt)) {
    if (isAllDay) return `${format(startedAt, 'yyyy年MM月dd日')} 〜 ${format(finishedAt, 'dd日')}`
    return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'dd日 HH:mm')}`
  }

  if (isAllDay) return `${format(startedAt, 'yyyy年MM月dd日')}`
  return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'HH:mm')}`
}

export function getLessonDateTimeLabel (lesson) {
  const { startedAt, finishedAt } = lesson
  return getEventDurationLabel(startedAt, finishedAt)
}

export function getDayLabel (day, formatPattern = 'E') {
  const date = add(nextSunday(new Date()), { days: day })
  return format(date, formatPattern, { locale })
}
