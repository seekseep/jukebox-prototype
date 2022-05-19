import { useCallback } from 'react'
import useSWR from 'swr'
import { format } from 'date-fns'

import {
  createRelation,
  updateRelation,
  deleteRelation,
  getStudentRelationRefs,
  getTeacherRelationRefs,
  getParentRelationRefs
} from '@/services/api/relations'
import {
  useMutation,
  useDocAsObjectQuery,
  useCollectioDocRefsQuery,
  expandSWR
} from '@/hooks/api'

export function useRelationRefs(roomId) {
  return useCollectioDocRefsQuery(`/rooms/${roomId}/relations`)
}

export function useRelation(roomId, relationId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/relations/${relationId}`)
}

export function useStudentRelationRefs(roomId, studentId) {
  const swr = useSWR([roomId, studentId], getStudentRelationRefs)
  return expandSWR(swr)
}

export function useTeacherRelationRefs(roomId, teacherId) {
  const swr = useSWR([roomId, teacherId], getTeacherRelationRefs)
  return expandSWR(swr)
}

export function useParentsRelationRefs(roomId, parentId) {
  const swr = useSWR([roomId, parentId], getParentRelationRefs)
  return expandSWR(swr)
}

export function useCreateRelation (roomId) {
  return useMutation(
    async (relation) => await createRelation(roomId, relation)
  )
}

export function useUpdateRelation (roomId, relationId) {
  return useMutation(
    async (relation) => await updateRelation(roomId, relationId, relation)
  )
}

export function useDeleteRelation (roomId, relationId) {
  return useMutation(
    async () => await deleteRelation(roomId, relationId)
  )
}

export function useGetRelationLabel () {
  return useCallback((relation) => {
    const startedAt = relation.startedAt.toDate()
    const finishedAt = relation.finishedAt.toDate()

    return `${format(startedAt, 'yyyy/MM/dd HH:mm')} ~ ${format(finishedAt, 'yyyy/MM/dd HH:mm')}`
  }, [])
}
