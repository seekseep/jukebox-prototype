import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { ROLE_TYPE } from '../constatnts'

import { db } from '../mocks/db'

import { useResourceUsersByRoleType } from './resources'

export function useCurrentEventId () {
  const {
    query: {
      eventId
    }
  } = useRouter()
  return eventId
}

export function useEvent (eventId) {
  return db.event.findFirst({
    where: {
      id: {
        equals: eventId
      }
    }
  })
}

export function useAllEvents () {
  return db.event.getAll()
}

export function useStudentsByEventId (eventId) {
  const event = useEvent(eventId)
  return useResourceUsersByRoleType(event, ROLE_TYPE.STUDENT)
}

export function useTeachersByEventId (eventId) {
  const event = useEvent(eventId)
  return useResourceUsersByRoleType(event, ROLE_TYPE.TEACHER)
}

export function useEventLessons (eventId) {
  const event = useEvent(eventId)
  return event?.lessons
}

export function useEventLessonEvents (eventId) {
  const lessons = useEventLessons()

  return useMemo(() => {
    const lessonEvents = []

    lessons.forEach(lesson =>
      lesson.events.forEach(event => {
        lessonEvents.push({
          ...event,
          lesson
        })
      })
    )

    return lessonEvents
  }, [lessons])
}
