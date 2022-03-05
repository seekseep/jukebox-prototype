import { differenceInWeeks, sub, add, getDay, format, getMonth, getYear, lastDayOfMonth } from 'date-fns'
import { useMemo } from 'react'

import { ROLE_TYPE, WEEK_DAY_COUNT } from '../constatnts'

function getDateKey (date) {
  return format(date, 'yyyy-MM-dd')
}

export function useEventsMapByDate (events) {
  return useMemo(() => {
    const eventsMapByDate = new Map()

    events.forEach(event => {
      const startedAt = new Date(event.startedAt)
      const key = getDateKey(startedAt)

      eventsMapByDate.set(key, [
        ...(eventsMapByDate.get(key) || []),
        event
      ])
    })

    return eventsMapByDate
  }, [events])
}

export function useMontlyCalendar (startDate, events) {
  const eventsMapByDate = useEventsMapByDate(events)

  const monthlyCalendar = useMemo(() => {
    const firstDate = new Date(getYear(startDate), getMonth(startDate), 1)
    const calendarStartDate = sub(firstDate, { days: getDay(firstDate) })
    const calendarLastDate = add(lastDayOfMonth(startDate), { days: 6 - getDay(lastDayOfMonth(startDate)) })
    const weekCount = differenceInWeeks(calendarLastDate, calendarStartDate) + 1

    const weeks = Array.from({ length: weekCount }).fill(null).map((_, w) => {
      return Array.from({ length: WEEK_DAY_COUNT }).fill(null).map((_, d) => {
        const offset = w * WEEK_DAY_COUNT + d
        const date = add(calendarStartDate, { days: offset })
        return {
          date,
          events: eventsMapByDate.get(getDateKey(date))
        }
      })
    })

    return { weeks }
  }, [eventsMapByDate, startDate])

  return monthlyCalendar
}

export function useWeeklyCalendar (startDate, events) {
  const eventsMapByDate = useEventsMapByDate(events)

  const weeklyCalenar = useMemo(() => {
    const teachers = {}
    const calendarStartDate = sub(startDate, { days: getDay(startDate) })
    const calendarFinishDate = add(startDate, { days: 6 - getDay(startDate) })

    Array.from({ length: WEEK_DAY_COUNT }).fill(null).forEach((_, i) => {
      const date = add(calendarStartDate, { days: i })
      const key = getDateKey(date)

      eventsMapByDate.get(key)?.forEach(event => {
        event.roles.forEach(role => {
          if (role.type !== ROLE_TYPE.TEACHER) return

          const user = role.user

          if (!teachers[user.id]) {
            teachers[user.id] = {
              user,
              days: Array.from({ length: WEEK_DAY_COUNT }).fill([])
            }
          }

          teachers[user.id].days[i] = [
            ...(teachers[user.id].days[i] || []),
            event
          ]
        })
      })
    })

    return {
      teachers: Object.values(teachers),
      startDate: calendarStartDate,
      finishDate: calendarFinishDate
    }
  }, [eventsMapByDate, startDate])

  return weeklyCalenar
}
