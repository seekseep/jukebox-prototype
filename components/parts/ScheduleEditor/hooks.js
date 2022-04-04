
import { format, add, getDay, previousSunday,startOfDay, nextSunday } from 'date-fns'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { db } from '../../../mocks/db'

const Context = createContext()

export function Provider ({ roomId, scheduleId, ...props }) {
  const schedule = useMemo(() => db.schedule.findFirst({ where: { id: { equals: scheduleId } } }), [scheduleId])
  const room = useMemo(() => db.room.findFirst({ where: { id: { equals: roomId } } }), [roomId])

  const [state, setState] = useState({ currentRange: null })

  useEffect(() => {
    if (!schedule) return

    setState(s => ({
      ...s,
      currentRange: Array.from({ length: 7 - getDay(schedule.startedAt) }).fill(null).map((_,i)=> add(schedule.startedAt, { days: i }))
    }))

  }, [schedule])


  if (!schedule || !room) return null

  return (
    <Context.Provider
      value={{ room, schedule, state, setState }}
      {...props} />
  )
}

export function useLessons () {
  const room = useRoom()
  const lessons = useMemo(() => {
    if (!room) return null

    return room.subjects.reduce((lessons, subject) => ([
      ...lessons, ...subject.lessons
    ]), [])
  }, [room])

  return lessons
}

export function useGetLessonsByTeacherIdAndDate() {
  const lessons = useLessons()

  const getKey = useCallback((teacherId, date) => {
    const key = `${teacherId}_${format(startOfDay(date), 'yyyy_MM_dd')}`
    return key
  }, [])

  const map = useMemo(() => {
    const map = {}

    lessons?.forEach(lesson => {
      const key = getKey(lesson.teachers[0].id, lesson.startedAt)
      map[key] = [...(map[key]||[]), lesson]
    })

    return map
  }, [getKey, lessons])

  return useCallback((teacherId, date) => {
    const key = getKey(teacherId, date)
    return map[key] || []
  }, [getKey, map])
}

export function useRange() {
  const { state: { currentRange }, setState, schedule } = useContext(Context)

  const goNextRange = useCallback(() => {
    setState(({ currentRange, ...s }) => {
      return {
        ...s,
        currentRange: Array.from({ length: 7 }).fill(null).map((_, i) => {
          return add(nextSunday(currentRange[0]), { days: i })
        }).filter(date => schedule.startedAt <= date && date <= schedule.finishedAt)
      }
    })
  }, [schedule.finishedAt, schedule.startedAt, setState])

  const goPrevRange = useCallback(() => {
    setState(({ currentRange, ...s }) => {
      return {
        ...s,
        currentRange: Array.from({ length: 7 }).fill(null).map((_, i) => {
          return add(previousSunday(currentRange[0]), { days: i })
        }).filter(date => schedule.startedAt <= date && date <= schedule.finishedAt)
      }
    })
  }, [schedule.finishedAt, schedule.startedAt, setState])

  return {
    currentRange,
    goNextRange,
    goPrevRange
  }
}

export function useRoom () {
  const { room } = useContext(Context)
  return room
}

export function useSchedule () {
  const { schedule } = useContext(Context)
  return schedule
}

export function useHourRuler () {
  const room = useRoom()

  const { startHour, finishHour } = useMemo(() => {
    if (!room) return { startHour: 0, finishHour: 23 }
    return room.frames.reduce(({ startHour, finishHour }, frameSet) => {
      return frameSet.reduce(({ startHour, finishHour }, { start,finish }) => {
        return {
          startHour : Math.min(startHour, start.hours),
          finishHour: Math.max(finishHour, finish.hours),
        }
      }, { startHour, finishHour })
    }, { startHour: 23, finishHour: 0 })
  }, [room])

  const hours = useMemo(() => {
    return Array.from({ length: finishHour - startHour + 1 }).fill(null).map((_, i) => ({
      hour   : startHour + i,
      minutes: Array.from({ length: 6 }).fill(null).map((_,i) => i * 10),
    }))
  }, [startHour, finishHour])

  return { hours, startHour, finishHour }
}
