import useSWR from 'swr'
import { useMemo } from 'react'

import {
  createLesson,
  updateLesson,
  updateLessons,
  deleteLesson,
  getSubjectLessons
} from '@/services/api/rooms/lessons'

import {
  useDeleteDocMutation,
  useMutation,
  useDocAsObjectQuery,
  expandSWR,
  useCollectionAsObjectArrayQuery
} from '@/hooks/api'
import { searchLessonRefs, searchLessons } from '@/services/api/rooms/lessons'
import { getSubjectRef } from '@/services/api/rooms/subjects'
import { getStudentRef } from '@/services/api/rooms/students'
import { getTeacherRef } from '@/services/api/rooms/teachers'
import { getSheetRef } from '@/services/api/rooms/sheets'
import SubjectLessons from '@/pages/rooms/[roomId]/subjects/[subjectId]/lessons'
import { refEqual } from 'firebase/firestore'

function appendReferncesToLesson ({ subject, students, teachers, sheets, ...lesson }, roomId) {
  if (subject) lesson.subject = getSubjectRef(roomId, subject)
  if (students) lesson.students = students.map(studentId => getStudentRef(roomId, studentId))
  if (teachers) lesson.teachers = teachers.map(teacherId => getTeacherRef(roomId, teacherId))
  if (sheets) lesson.sheets = sheets.map(sheetId => getSheetRef(roomId, sheetId))
  return lesson
}

export function useLessonsQuery(roomId) {
  return useCollectionAsObjectArrayQuery(roomId && `/rooms/${roomId}/lessons`)
}

export function useSearchLessonsQuery(roomId, query) {
  const swr = useSWR(roomId && [roomId, query, 'lessons', new URLSearchParams(query).toString(), 'as-object'], searchLessons)
  return expandSWR(swr)
}

export function useLessonQuery(roomId, lessonId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/lessons/${lessonId}`)
}

export function useSubjectLessonsQuery(roomId, subjectId) {
  const { data: lessons, ...result } = useLessonsQuery(roomId)

  const subjectLessons = useMemo(() => {
    if (!lessons || !subjectId) return lessons
    const subjectRef = getSubjectRef(roomId, subjectId)
    return lessons.filter(lesson => refEqual(lesson.subject, subjectRef))
  }, [lessons, roomId, subjectId])

  return { data: subjectLessons, ...result }
}

export function useCreateLessonMutation (roomId) {
  return useMutation(
    async (lesson) => await createLesson(roomId, appendReferncesToLesson(lesson, roomId))
  )
}

export function useUpdateLessonMutation (roomId, lessonId) {
  return useMutation(
    async (lesson) => await updateLesson(roomId, lessonId, appendReferncesToLesson(lesson, roomId))
  )
}

export function useDleteLessonMutation (roomId, lessonId) {
  return useDeleteDocMutation(roomId && lessonId && `/rooms/${roomId}/lessons/${lessonId}`)
}

export function useCreateLessonsMutation(roomId) {
  return useMutation(
    async (lessons) => {
      for (let lesson of lessons) {
        await createLesson(roomId, appendReferncesToLesson(lesson, roomId))
      }
    }
  )
}

export function useCreateSubjectLessonsMutation(roomId, subjectId) {
  return useMutation(
    async (lessons) => {
      for (let lesson of lessons) {
        await createLesson(roomId, appendReferncesToLesson({ ...lesson, subject: subjectId, }, roomId))
      }
    }
  )
}

export function useUpdateLessonsMutation(roomId) {
  return useMutation(
    async (lessons) => {
      await updateLessons(roomId, lessons.map(lesson => appendReferncesToLesson(lesson, roomId)))
    }
  )
}

export function useDeleteLessonsMutation(roomId) {
  return useMutation(
    async (lessonIds) => {
      for (let lessonId of lessonIds) await deleteLesson(roomId, lessonId)
    }
  )
}

function isStudentLesson (lesson, studentId)  {
  return lesson.students.some(student => student.id === studentId)
}

function isTeacherLesson (lesson, teacherId)  {
  return lesson.teachers.some(teacher => teacher.id === teacherId)
}

export function useStudentLessonsQuery(roomId, studentId) {
  const result = useLessonsQuery(roomId)

  const studentLessons = useMemo(() => {
    const lessons = result?.data
    if (!lessons) return lessons
    return lessons.filter(lesson => isStudentLesson(lesson, studentId))
  }, [result?.data, studentId])

  return { ...result, data: studentLessons }
}

export function useTeacherLessonsQuery(roomId, teacherId) {
  const result = useLessonsQuery(roomId)

  const teacherLessons = useMemo(() => {
    const lessons = result?.data
    if (!lessons) return lessons
    return lessons.filter(lesson => isTeacherLesson(lesson, teacherId))
  }, [result?.data, teacherId])

  return { ...result, data: teacherLessons }
}
