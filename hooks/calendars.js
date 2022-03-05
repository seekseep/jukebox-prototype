import { differenceInWeeks, sub, add, getDay, format } from 'date-fns'
import { useMemo } from 'react'

import { WEEK_DAY_COUNT } from '../constatnts'

export function useWeekEventsFromYearAndMonth (year, month, events) {
  const weeks = useMemo(() => {
    const monthEvents = new Map()

    function getDateKey (date) {
      return format(date, 'yyyy-MM-dd')
    }

    events.forEach(event => {
      const startedAt = new Date(event.startedAt)
      const key = getDateKey(startedAt)

      monthEvents.set(key, [
        ...(monthEvents.get(key) || []),
        event
      ])
    })

    const startMonthDate = new Date(year, month - 1, 1)
    const finishMonthDate = sub(add(startMonthDate, { months: 1 }), { days: 1 })
    const startDate = sub(startMonthDate, { days: getDay(startMonthDate) })
    const finishDate = add(finishMonthDate, { days: 6 - getDay(finishMonthDate) })
    const weekCount = differenceInWeeks(finishDate, startDate) + 1

    const weeks = Array.from({ length: weekCount }).fill(null).map((_, w) => {
      return Array.from({ length: WEEK_DAY_COUNT }).fill(null).map((_, d) => {
        const offset = w * WEEK_DAY_COUNT + d
        const date = add(startDate, { days: offset })
        return {
          date,
          events: monthEvents.get(getDateKey(date))
        }
      })
    })

    return weeks
  }, [events, year, month])

  return weeks
}
