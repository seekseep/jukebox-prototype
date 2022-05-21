import { createLessonFrame, updateLessonFrame, deleteLessonFrame } from '@/services/api/lessonFrames'

import { useMutation, useDocAsObjectQuery, useCollectioDocRefsQuery, useCollectionAsObjectArrayQuery } from '@/hooks/api'
import { useMemo } from 'react'

export function useLessonFrameRefs(roomId) {
  return useCollectioDocRefsQuery(`/rooms/${roomId}/lessonFrames`)
}

export function useLessonFrame(roomId, lessonFrameId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/lessonFrames/${lessonFrameId}`)
}

export function useLessonFrames(roomId) {
  return useCollectionAsObjectArrayQuery(`/rooms/${roomId}/lessonFrames`)
}

export function useCreateLessonFrame (roomId) {
  return useMutation(
    async (lessonframe) => await createLessonFrame(roomId, lessonframe)
  )
}

export function useUpdateLessonFrame (roomId, lessonFrameId) {
  return useMutation(
    async (lessonframe) => await updateLessonFrame(roomId, lessonFrameId, lessonframe)
  )
}

export function useDeleteLessonFrame (roomId, lessonFrameId) {
  return useMutation(
    async () => await deleteLessonFrame(roomId, lessonFrameId)
  )
}

export function useTagOptions(tags) {
  return useMemo(() => tags?.map(tag => ({ label: tag, value: tag })) || [], [tags])
}

export function useLessonFrameTags(lessonFrames) {
  return useMemo(() => {
    if (!lessonFrames) return []

    const tags = {}

    lessonFrames.forEach(lessonFrame => {
      lessonFrame?.tags.forEach(tag => {
        tags[tag] = tag
      })
    })

    return Object.values(tags)
  }, [lessonFrames])
}
