import useSWR from 'swr'

import { useMutation, useDocAsObjectQuery, expandSWR, useCollectioDocRefsQuery } from './api'
import { createLesson, updateLesson, deleteLesson, getSubjectLessonRefs } from '@/services/api/lessons'

export function useLessonRefs(roomId) {
  return useCollectioDocRefsQuery(`/rooms/${roomId}/lessons`)
}

export function useLesson(roomId, lessonId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/lessons/${lessonId}`)
}

export function useSubjectLessonRefs(roomId, subjectId) {
  const swr = useSWR([roomId, subjectId, 'lessons'], getSubjectLessonRefs)
  return expandSWR(swr)
}

export function useCreateLesson (roomId) {
  return useMutation(
    async (lesson) => await createLesson(roomId, lesson)
  )
}

export function useCreateLessons(roomId) {
  return useMutation(
    async (lessons) => {
      for (let lesson of lessons) await createLesson(roomId, lesson)
    }
  )
}

export function useUpdateLesson (roomId, lessonId) {
  return useMutation(
    async (lesson) => await updateLesson(roomId, lessonId,lesson)
  )
}

export function useDeleteLesson (roomId, lessonId) {
  return useMutation(
    async () => await deleteLesson(roomId, lessonId)
  )
}

export function useDeleteLessons(roomId) {
  return useMutation(
    async (lessonIds) => {
      for (let lessonId of lessonIds) await deleteLesson(roomId, lessonId)
    }
  )
}
