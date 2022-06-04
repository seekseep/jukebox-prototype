import { useMemo } from 'react'

import {
  useDocAsObjectQuery,
  useCollectionAsObjectArrayQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation
} from '@/hooks/api'

export function useLessonFrameQuery(roomId, lessonFrameId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/lessonFrames/${lessonFrameId}`)
}

export function useLessonFramesQuery(roomId) {
  return useCollectionAsObjectArrayQuery(`/rooms/${roomId}/lessonFrames`)
}

export function useCreateLessonFrameMutation (roomId) {
  return useCreateDocMutation(roomId && `/rooms/${roomId}/lessonFrames`)
}

export function useUpdateLessonFrameMutation (roomId, lessonFrameId) {
  return useUpdateDocMutation(roomId && lessonFrameId && `/rooms/${roomId}/lessonFrames/${lessonFrameId}`)
}

export function useDeleteLessonFrameMutation (roomId, lessonFrameId) {
  return useDeleteDocMutation(roomId && lessonFrameId && `/rooms/${roomId}/lessonFrames/${lessonFrameId}`)
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
