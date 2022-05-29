import { createContext, useContext, useMemo } from 'react'
import { getHours, getMinutes } from 'date-fns'
import { WEEK_DAY } from '@/constants'

export const HOUR_COL_WIDTH = 10
export const LESSON_ROW_HEIGHT = 2

export const LESSON_ROWS_COUNT = 3
export const DEFAULT_DAYS = Object.values(WEEK_DAY)

export const Z_INDEX = Object.freeze({
  CALENDAR: 1000,
  BODY_COL: 1001,
  LESSON  : 1002,
  HEAD_COL: 1100,
})

const Context = createContext({})

export function CalendarProvider ({
  startHours = 0, endHours = 23, days = DEFAULT_DAYS,
  startedAt = null,
  hourColWidth = HOUR_COL_WIDTH,
  lessonRowHeight = LESSON_ROW_HEIGHT,
  lessonRowsCount = LESSON_ROWS_COUNT,
  headColWidth = 0,
  ...props
}) {
  return (
    <Context.Provider
      value={{
        startedAt,
        startHours,
        endHours,
        days,
        headColWidth,
        hourColWidth,
        lessonRowHeight,
        lessonRowsCount
      }}
      {...props} />
  )
}

export function useCalendarContext () {
  return useContext(Context)
}

export function useDays () {
  const { days } = useContext(Context)
  return days
}

export function useHours () {
  const context = useContext(Context)
  const { startHours, endHours } = context

  return useMemo(() => {
    const hours = []

    for (let hour = startHours; hour <= endHours; hour++) {
      hours.push(hour)
    }

    return hours
  }, [startHours, endHours])
}

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

export function useHeadColStyle(style = {}) {
  return useMemo(() => ({
    ...style,
    zIndex: Z_INDEX.HEAD_COL,
  }), [style])
}

export function useBodyColStyle(style) {
  return useMemo(() => ({
    ...style,
    zIndex: Z_INDEX.BODY_COL
  }), [style])
}

export function useLessonContainerStyle(style) {
  return useMemo(() => ({
    ...style,
    zIndex: Z_INDEX.CALENDAR
  }), [style])
}

export function usePlacedLesssons (lessons) {
  return useMemo(() => {
    const placedLessons = []

    const rows = []

    lessons.forEach(lesson => {
      const { startedAt, finishedAt } = lesson

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

      const start = getHours(startedAt) + getMinutes(startedAt) / 60
      const end = getHours(finishedAt) + getMinutes(finishedAt) / 60

      placedLessons.push({
        lesson,
        placement: {
          start,
          duration: end - start,
          row
        }
      })
    })

    return placedLessons
  }, [lessons])
}

export function useLessonStyle ({ start, duration, row }) {
  return useMemo(() => ({
    top   : `${row  * LESSON_ROW_HEIGHT}rem`,
    width : `${duration * HOUR_COL_WIDTH}rem`,
    left  : `${start * HOUR_COL_WIDTH}rem`,
    zIndex: row + Z_INDEX.LESSON
  }), [duration, row, start])
}
