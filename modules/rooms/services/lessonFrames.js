import { REPEAT_TYPE } from '@rooms/constants'

import { getDayLabel } from './lessons/labels'

export function getLessonFrameDateLabel (lessonframe) {
  const { repeat, repeatIndexes } = lessonframe

  if (repeat === REPEAT_TYPE.WEEKLY) {
    return `毎週 ${repeatIndexes?.map(day => getDayLabel(day)).join('・')}`
  }

  if (repeat === REPEAT_TYPE.MONTHLY) {
    return `毎月 ${repeatIndexes?.map(index => `${index + 1}日`).join('・')}`
  }

  if (repeat === REPEAT_TYPE.DAILY) {
    return '毎日'
  }

  return '予期せぬ繰り返し'
}

export function getLessonFrameTimeLabel (lessonframe) {
  const { repeatStartTime, repeatFinishTime } = lessonframe
  return `${repeatStartTime} ~ ${repeatFinishTime}`
}
