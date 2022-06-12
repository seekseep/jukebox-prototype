import { useMemo } from 'react'
import { getHours, getMinutes } from 'date-fns'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'

export const Z_INDEX = Object.freeze({
  CALENDAR: 1000,
  BODY_COL: 1001,
  LESSON  : 1002,
  HEAD_COL: 1100,
})

export function useGridStyle ({ width, height, top, left } = {}) {
  return useMemo(() => {
    const style = {}
    if (width) style.width = `${width}rem`
    if (height) style.height = `${height}rem`
    if (top) style.top = `${top}rem`
    if (left) style.left = `${left}rem`
    return style
  }, [height, left, top, width])
}

export function usePlacedLesssons (lessons) {
  const {
    startHour: displayStartHour,
    endHour: displayEndHour
  } = useCalendarContext()

  return useMemo(() => {
    const placedLessons = []
    const rows = []

    lessons.forEach(lesson => {
      const { startedAt, finishedAt } = lesson
      const lessonStartHour = getHours(startedAt) + getMinutes(startedAt) / 60
      const lessonEndHour = getHours(finishedAt) + getMinutes(finishedAt) / 60

      const isOutOfRange = lessonEndHour <= displayStartHour || displayEndHour <= lessonStartHour
      if (isOutOfRange) return

      let row = null
      for (let i = 0; i <= rows.length; i++) {
        rows[i] = rows[i] || []

        const lastLesson = rows[i][rows[i].length - 1]
        const isOverlap = !!lastLesson && lastLesson.finishedAt > startedAt
        if (isOverlap) continue

        row = i
        rows[i].push(lesson)
        break
      }

      const start = Math.max(0, lessonStartHour - displayStartHour)

      const duration = Math.min(lessonEndHour, displayEndHour) - Math.max(lessonStartHour, displayStartHour)

      placedLessons.push({
        lesson,
        placement: {
          start,
          duration,
          row,
          isOverflowToBefore: lessonStartHour < displayStartHour,
          isOverflowToAfter : lessonEndHour > displayEndHour
        }
      })
    })

    return placedLessons
  }, [displayEndHour, displayStartHour, lessons])
}
