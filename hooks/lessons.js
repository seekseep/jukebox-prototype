import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { ROLE_TYPE } from '../constatnts'
import { db } from '../mocks/db'

export function useCurrentLessonId () {
  const {
    query: {
      lessonId
    }
  } = useRouter()
  return lessonId
}

export function useLesson (lessonId) {
  return db.lesson.findFirst({
    where: {
      id: {
        equals: lessonId
      }
    }
  })
}

export function useLessonUserByRoleType (lessonId, roleType) {
  const lesson = useLesson(lessonId)

  const filteredUser = useMemo(() => {
    if (!lesson) return null
    return lesson.roles.filter(role => role.type === roleType).map(role => role.user)
  }, [lesson, roleType])

  return filteredUser
}

export function useStudentsByLessonId (lessonId) {
  return useLessonUserByRoleType(lessonId, ROLE_TYPE.STUDENT)
}

export function useTeachersByLessonId (lessonId) {
  return useLessonUserByRoleType(lessonId, ROLE_TYPE.TEACHER)
}

export function useAllLessons () {
  return db.lesson.getAll()
}

export function useLessonEvents (lessonId) {
  const lesson = useLesson(lessonId)
  return lesson?.events
}
