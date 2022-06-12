import { createContext, useContext, useMemo } from 'react'
import { WEEK_DAY } from '@/constants'

export const DEFAULT_DAYS = Object.values(WEEK_DAY)

const CalendarContext = createContext({})

export function CalendarProvider ({
  roomId, lessons, startedAt,
  teachers, students,
  startHour = 0, endHour = 23,
  days = DEFAULT_DAYS,
  ...props
}) {
  return (
    <CalendarContext.Provider
      value={{
        roomId,
        lessons,
        startedAt,
        teachers,
        students,
        startedAt,
        startHour,
        endHour,
        days,
      }}
      {...props} />
  )
}

export function useCalendarContext () {
  return useContext(CalendarContext)
}

export function useHours () {
  const context = useContext(CalendarContext)
  const { startHour, endHour } = context

  return useMemo(() => {
    const hours = []
    for (let hour = startHour; hour < endHour; hour++) hours.push(hour)
    return hours
  }, [startHour, endHour])
}
