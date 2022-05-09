import { useMutation, useCollectionQuery, expandSWR } from './api'

import {
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
} from '../services/api/lessons'
import { getStudentRef } from '../services/api/students'
import { getTeacherRef } from '../services/api/teachers'
import { getSheetRef } from '../services/api/sheets'
import useSWR from 'swr'
import { getSubjectRef } from '@/services/api/subjects'

function getTransformLessonForFirestore (roomId) {
  return function transformLesson ({ subject: subjectId, students, teachers, sheets, ...lesson }) {
    if (subjectId) {
      lesson.subject = getSubjectRef(roomId, subjectId)
    }

    if(students){
      lesson.students = students.map(studentId => getStudentRef(roomId, studentId))
    }

    if(teachers){
      lesson.teachers = teachers.map(teacherId => getTeacherRef(roomId, teacherId))
    }

    if(sheets)  {
      lesson.sheets = sheets.map(sheetId => getSheetRef(roomId, sheetId))
    }

    return lesson
  }
}

export function useLessons(roomId) {
  return useCollectionQuery(`/rooms/${roomId}/lessons`)
}

export function useLesson(roomId, lessonId) {
  const swr = useSWR([roomId, lessonId], getLesson)
  return expandSWR(swr)
}

export function useCreateLessons(roomId) {
  const transform = getTransformLessonForFirestore(roomId)
  return useMutation(
    async (lessons) => {
      const createdLessons = []

      for (let lesson of lessons) {
        const createdLesson = await createLesson(roomId, transform(lesson))
        createdLessons.push(createdLesson)
      }

      return createdLessons
    }
  )
}

export function useDeleteLessons(roomId) {
  return useMutation(
    async (lessonIds) => {
      for (let lessonId of lessonIds) await deleteLesson(roomId, lessonId)
      return
    }
  )
}

export function useCreateLesson (roomId) {
  const transform = getTransformLessonForFirestore(roomId)
  return useMutation(
    async (lesson) => {
      return await createLesson(
        roomId,
        transform(lesson),
      )
    }
  )
}

export function useUpdateLesson (roomId, lessonId) {
  const transform = getTransformLessonForFirestore(roomId)
  return useMutation(
    async (lesson) => {
      return await updateLesson(
        roomId,
        lessonId,
        transform(lesson)
      )
    }
  )
}

export function useDeleteLesson (roomId, lessonId) {
  return useMutation(
    async () => {
      return await deleteLesson(roomId, lessonId)
    }
  )
}
