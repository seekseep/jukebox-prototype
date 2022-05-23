import useSWR from 'swr'

import { createLesson, updateLesson, deleteLesson, getSubjectLessonRefs } from '@/services/api/rooms/lessons'

import {
  useDeleteDocMutation,
  useMutation,
  useDocAsObjectQuery,
  expandSWR,
  useCollectioDocRefsQuery
} from '@/hooks/api'
import { getSubjectRef } from '@/services/api/rooms/subjects'
import { getStudentRef } from '@/services/api/rooms/students'
import { getTeacherRef } from '@/services/api/rooms/teachers'
import { getSheetRef } from '@/services/api/rooms/sheets'

function appendReferncesToLesson ({ subject, students, teachers, sheets, ...lesson }, roomId) {
  console.log({ subject })
  if (subject) lesson.subject = getSubjectRef(roomId, subject)
  if (students) lesson.students = students.map(studentId => getStudentRef(roomId, studentId))
  if (teachers) lesson.teachers = teachers.map(teacherId => getTeacherRef(roomId, teacherId))
  if (sheets) lesson.sheets = sheets.map(sheetId => getSheetRef(roomId, sheetId))
  return lesson
}

export function useLessonRefsQuery(roomId) {
  return useCollectioDocRefsQuery(`/rooms/${roomId}/lessons`)
}

export function useLessonQuery(roomId, lessonId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/lessons/${lessonId}`)
}

export function useSubjectLessonRefsQuery(roomId, subjectId) {
  const swr = useSWR([roomId, subjectId, 'lessons'], getSubjectLessonRefs)
  return expandSWR(swr)
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
      for (let lesson of lessons) await updateLesson(roomId, appendReferncesToLesson(lesson, roomId))
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
