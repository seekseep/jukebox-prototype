import { createContext, useContext, useMemo } from 'react'
import { WEEK_DAY } from '@/constants'

export const DEFAULT_DAYS = Object.values(WEEK_DAY)

const CalendarContext = createContext({})

// TODO: プロパティの構成を変更
export function CalendarProvider ({
  roomId, lessons, startedAt,
  teachers, students,
  startHour = 0, endHour = 23,
  days: rawDays,
  teacher = null,
  student = null,
  ...props
}) {
  const days = useMemo(() => {
    if (!rawDays || rawDays.length < 1) return DEFAULT_DAYS
    return rawDays
  }, [rawDays])

  const hours = useMemo(() => {
    const hours = []
    for (let hour = startHour; hour < endHour; hour++) hours.push(hour)
    return hours
  }, [startHour, endHour])

  return (
    <CalendarContext.Provider
      value={{
        roomId,
        lessons,
        startedAt,
        teachers,
        students,
        startedAt,
        hours,
        startHour,
        endHour,
        days,
        teacher,
        student,
      }}
      {...props} />
  )
}

export function useCalendarContext () {
  return useContext(CalendarContext)
}
