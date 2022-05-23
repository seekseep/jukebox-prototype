import useSWR from 'swr'
import { useMemo } from 'react'

import {
  useCollectioDocRefsQuery,
  useDocAsObjectQuery,
  useCollectionAsObjectArrayQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation,
  expandSWR
} from '@/hooks/api'
import {
  getTeacherSubjectRefs,
  getStudentSubjectRefs
} from '@/services/api/rooms/subjects'

export function useSubjectRefsQuery(roomId) {
  return useCollectioDocRefsQuery(roomId && `/rooms/${roomId}/subjects`)
}

export function useSubjectsQuery(roomId) {
  return useCollectionAsObjectArrayQuery(roomId && `/rooms/${roomId}/subjects`)
}

export function useSubjectQuery(roomId, subjectId) {
  return useDocAsObjectQuery(roomId && subjectId && `/rooms/${roomId}/subjects/${subjectId}`)
}

export function useCreateSubjectMutation (roomId) {
  return useCreateDocMutation(roomId && `/rooms/${roomId}/subjects`)
}

export function useUpdateSubjectMutation (roomId, subjectId) {
  return useUpdateDocMutation(roomId && subjectId && `/rooms/${roomId}/subjects/${subjectId}`)
}

export function useDeleteSubjectMutation (roomId, subjectId) {
  return useDeleteDocMutation(roomId && subjectId && `/rooms/${roomId}/subjects/${subjectId}`)
}

export function useStudentSubjectRefsQuery(roomId, studentId) {
  const swr = useSWR(roomId && studentId && [roomId, studentId, 'subjects'], getStudentSubjectRefs)
  return expandSWR(swr)
}

export function useTeacherSubjectRefsQuery(roomId, teacherId) {
  const swr = useSWR(roomId && teacherId && [roomId, teacherId, 'subjects'], getTeacherSubjectRefs)
  return expandSWR(swr)
}

export function useSubjectOptions (subjects) {
  return useMemo(() => subjects?.map(({ id: value, name:label }) => ({ label, value })) || [], [subjects])
}
