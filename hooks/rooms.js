import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { ROLE_TYPE } from '../constatnts'

import { db } from '../mocks/db'

import { useResourceUsersByRoleType } from './resources'

export function useCurrentRoomId () {
  const {
    query: {
      roomId
    }
  } = useRouter()
  return roomId
}

export function useRoom (roomId) {
  return db.room.findFirst({
    where: {
      id: {
        equals: roomId
      }
    }
  })
}

export function useAllRooms () {
  return db.room.getAll()
}

export function useStudentsByRoomId (roomId) {
  const room = useRoom(roomId)
  return useResourceUsersByRoleType(room, ROLE_TYPE.STUDENT)
}

export function useTeachersByRoomId (roomId) {
  const room = useRoom(roomId)
  return useResourceUsersByRoleType(room, ROLE_TYPE.TEACHER)
}

export function useRoomLessons (roomId) {
  const room = useRoom(roomId)
  return room?.lessons
}

export function useRoomLessonEvents (roomId) {
  const lessons = useRoomLessons()

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
