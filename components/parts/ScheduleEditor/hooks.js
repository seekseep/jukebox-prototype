
import { format, add, getDay, previousSunday,startOfDay, nextSunday } from 'date-fns'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { useSchool as useFirestoreSchool } from '@/hooks/schools'
import { useRoom as useFirestoreRoom } from '@/hooks/rooms'
import { useSubjectsIncludingLessons as useFirestoreSubjects } from '@/hooks/subjects'
import { useTeachers as useFirestoreTeachers } from '@/hooks/teachers'
import { useStudents as useFirestoreStudents } from '@/hooks/students'
import { useSchedule as useFirestoreSchedule } from '@/hooks/schedules'
import { useFrameRulesSets as useFirestoreFrameRulesSets } from '@/hooks/frameRulesSets'

const Context = createContext()

export function Provider ({ schoolId, roomId, scheduleId, ...props }) {

  const [state, setState] = useState({ currentRange: null })

  const { data: school, isLoading: isGettingSchool } = useFirestoreSchool(schoolId)
  const { data: room, isLoading: isGettingRoom } = useFirestoreRoom(schoolId, roomId)
  const { data: subjects, isLoading: isGettingSubjects } = useFirestoreSubjects(schoolId, roomId)
  const { data: teachers, isLoading: isGettingTeachers } = useFirestoreTeachers(schoolId, roomId)
  const { data: students, isLoading: isGettingStudents } = useFirestoreStudents(schoolId, roomId)
  const { data: frameRulesSets, isLoading: isGettingFrameRulesSets } = useFirestoreFrameRulesSets(schoolId, roomId)
  const { data: schedule, isLoading: isGettingSchedule } = useFirestoreSchedule(schoolId, roomId, scheduleId)

  const isLoading = isGettingSchool || isGettingRoom || isGettingSubjects || isGettingTeachers || isGettingStudents || isGettingSchedule || isGettingFrameRulesSets

  useEffect(() => {
    if (!schedule) return
    setState(s => {
      const startedAt = schedule.startedAt.toDate()
      const currentRange = Array.from({ length: 7 - getDay(startedAt) }).fill(null).map((_, i)=> add(startedAt, { days: i }))
      return { ...s, currentRange }
    })
  }, [schedule])


  if (isLoading) return null

  return (
    <Context.Provider
      value={{
        school,
        room,
        schedule,
        subjects,
        teachers,
        students,
        frameRulesSets,
        state, setState }}
      {...props} />
  )
}

export function useSchool () {
  const { school } = useContext(Context)
  return school
}

export function useRoom () {
  const { room } = useContext(Context)
  return room
}

export function useFrameRulesSets () {
  const { frameRulesSets } = useContext(Context)
  return frameRulesSets
}

export function useSubjects () {
  const { subjects } = useContext(Context)
  return subjects
}

export function useTeachers () {
  const { teachers } = useContext(Context)
  return teachers
}

export function useStudents () {
  const { students } = useContext(Context)
  return students
}

export function useSchedule () {
  const { schedule } = useContext(Context)
  return schedule
}

export function useLessons () {
  const subjects = useSubjects()

  const lessons = useMemo(() => {
    if (!subjects) return null
    return subjects.reduce((lessons, subject) => ([
      ...lessons, ...subject.lessons
    ]), [])
  }, [subjects])

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
      const key = getKey(lesson.teachers[0].id, lesson.startedAt.toDate())
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
      const startedAt = schedule.startedAt.toDate()
      const finishedAt = schedule.finishedAt.toDate()
      return {
        ...s,
        currentRange: Array.from({ length: 7 }).fill(null).map((_, i) => {
          return add(nextSunday(currentRange[0]), { days: i })
        }).filter(date => startedAt <= date && date <= finishedAt)
      }
    })
  }, [schedule.finishedAt, schedule.startedAt, setState])

  const goPrevRange = useCallback(() => {
    setState(({ currentRange, ...s }) => {
      const startedAt = schedule.startedAt.toDate()
      const finishedAt = schedule.finishedAt.toDate()
      return {
        ...s,
        currentRange: Array.from({ length: 7 }).fill(null).map((_, i) => {
          return add(previousSunday(currentRange[0]), { days: i })
        }).filter(date => startedAt <= date && date <= finishedAt)
      }
    })
  }, [schedule.finishedAt, schedule.startedAt, setState])

  return {
    currentRange,
    goNextRange,
    goPrevRange
  }
}

export function useHourRuler () {
  const frameRulesSets = useFrameRulesSets()
  const { startHour, finishHour } = useMemo(() => {
    if (!frameRulesSets) return { startHour: 0, finishHour: 23 }

    let startHour = 23
    let finishHour = 0

    frameRulesSets.forEach(frameRulesSet => {
      frameRulesSet.rules.forEach(rule => {
        startHour = Math.min(startHour, rule.start.hours)
        finishHour = Math.max(finishHour, rule.finish.hours)
      })
    })

    return { startHour, finishHour }
  }, [frameRulesSets])

  const hours = useMemo(() => {
    return Array.from({ length: finishHour - startHour + 1 }).fill(null).map((_, i) => ({
      hour   : startHour + i,
      minutes: Array.from({ length: 6 }).fill(null).map((_,i) => i * 10),
    }))
  }, [startHour, finishHour])

  return { hours, startHour, finishHour }
}
