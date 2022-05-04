import { startOfMonth, endOfMonth, format } from 'date-fns'
import { useMutation, useDocumentQuery, useCollectionQuery, expandSWR } from './api'
import { useMemo } from 'react'
import * as Yup from 'yup'

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

function transformLessonForFirestore (schoolId, roomId, subjectId, { students, teachers, sheets, ...lesson }) {
  return {
    ...lesson,
    students: students.map(studentId => getStudentRef(schoolId, roomId, studentId)),
    teachers: teachers.map(teacherId => getTeacherRef(schoolId, roomId, teacherId)),
    sheets  : sheets.map(sheetId => getSheetRef(schoolId, roomId, sheetId)),
  }
}

export function useLessonSchema () {
  return useMemo(() => Yup.object().shape({
    startedAt : Yup.string().default(format(startOfMonth(new Date()), 'yyyy-MM-dd')),
    finishedAt: Yup.string().default(format(endOfMonth(new Date()), 'yyyy-MM-dd')),
  }),[])
}

export function useLessons(schoolId, roomId, subjectId) {
  return useCollectionQuery(`/schools/${schoolId}/rooms/${roomId}/subjects/${subjectId}/lessons`)
}

export function useLesson(schoolId, roomId, subjectId, lessonId) {
  const swr = useSWR([schoolId, roomId, subjectId, lessonId], getLesson)
  return expandSWR(swr)
}

export function useCreateLesson (schoolId, roomId, subjectId) {
  return useMutation(
    async (lesson) => {
      return await createLesson(
        schoolId,
        roomId,
        subjectId,
        transformLessonForFirestore(
          schoolId,
          roomId,
          subjectId,
          lesson
        )
      )
    }
  )
}

export function useUpdateLesson (schoolId, roomId, subjectId, lessonId) {
  return useMutation(
    async (lesson) => {
      await updateLesson(
        schoolId,
        roomId,
        subjectId,
        lessonId,
        transformLessonForFirestore(
          schoolId,
          roomId,
          subjectId,
          lesson
        )
      )
    }
  )
}

export function useDeleteLesson (schoolId, roomId, subjectId, lessonId) {
  return useMutation(
    async () => {
      await deleteLesson(schoolId, roomId, subjectId, lessonId)
    }
  )
}
