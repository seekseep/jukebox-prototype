import { REPEAT_TYPE } from '@rooms/constants'
import { format } from 'date-fns'
import { getDayLabel, getEventDateDurationLabel } from './lessons'

export function getScheduleDateLabel (schedule) {
  const { repeat, startedAt, finishedAt, repeatIndexes } = schedule

  if (repeat === REPEAT_TYPE.WEEKLY) {
    return `毎週 ${repeatIndexes?.map(day => getDayLabel(day)).join('・')}`
  }

  if (repeat === REPEAT_TYPE.MONTHLY) {
    return `毎月 ${repeatIndexes?.map(index => `${index + 1}日`).join('・')}`
  }

  if (repeat === REPEAT_TYPE.DAILY) {
    return '毎日'
  }

  if (repeat !== REPEAT_TYPE.NONE) {
    return '予期せぬ予定'
  }

  return getEventDateDurationLabel(startedAt, finishedAt)
}

export function getScheduleTimeLabel (schedule) {
  if (schedule.isAllDay) return ''

  const { repeat, startedAt, finishedAt, repeatStartTime, repeatFinishTime } = schedule

  if (repeat !== REPEAT_TYPE.NONE) {
    return `${repeatStartTime} ~ ${repeatFinishTime}`
  }

  return `${format(startedAt, 'HH:mm')} ~ ${format(finishedAt, 'HH:mm')}`
}
