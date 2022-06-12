import { useMemo } from 'react'
import { useCalendarContext, useGridStyle, useHours, Z_INDEX } from '../../hooks'


export function useHourColStyle () {
  const hours = useHours()
  return useMemo(() => ({
    width: `${1 / hours.length * 100}%`
  }), [hours.length])
}

export function useHeadColStyle () {
  const { headColWidth } = useCalendarContext()
  return useGridStyle({
    width: headColWidth
  })
}

export function useLessonStyle ({ row, duration, start }) {
  const { startHour, endHour, lessonRowsCount } = useCalendarContext()
  return useMemo(() => {
    const displayDuration = endHour - startHour
    return {
      top   : `${100 * row / lessonRowsCount}%`,
      height: `${100 * 1 / lessonRowsCount}%`,
      width : `${100 * duration / displayDuration}%`,
      left  : `${100 * start / displayDuration}%`,
      zIndex: row + Z_INDEX.LESSON
    }
  }, [duration, endHour, lessonRowsCount, row, start, startHour])
}
