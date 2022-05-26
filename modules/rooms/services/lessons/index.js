import { format, getDate, getMonth, getYear } from 'date-fns'

export function getLessonDateLabel(lesson) {
  const { startedAt } = lesson
  if (!startedAt) return '不明'
  return format(startedAt, 'yyyy年MM月dd日 HH:mm')
}

export function getLessonDateTimeLabel (lesson) {
  const { startedAt, finishedAt } = lesson

  if (getYear(startedAt) !== getYear(finishedAt)) {
    return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(startedAt, 'yyyy年MM月dd日 HH:mm')}`
  }

  if (getMonth(startedAt) !== getMonth(finishedAt)) {
    return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'MM月dd日 HH:mm')}`
  }

  if (getDate(startedAt) !== getDate(finishedAt)) {
    return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'dd日 HH:mm')}`
  }

  return `${format(startedAt, 'yyyy年MM月dd日 HH:mm')} 〜 ${format(finishedAt, 'HH:mm')}`
}
