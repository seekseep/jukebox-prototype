import { useCallback } from 'react'
import useSWR from 'swr'
import { format } from 'date-fns'

import { getAccountRef } from '@/services/api/rooms/accounts'
import { getStudentRef } from '@/services/api/rooms/students'
import { getTeacherRef } from '@/services/api/rooms/teachers'
import {
  createRelation,
  getStudentRelationRefs,
  getTeacherRelationRefs,
  getParentRelationRefs
} from '@/services/api/rooms/relations'

import {
  useMutation,
  useDocAsObjectQuery,
  useCollectioDocRefsQuery,
  expandSWR,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation
} from '@/hooks/api'

export function useRelationRefsQuery(roomId) {
  return useCollectioDocRefsQuery(`/rooms/${roomId}/relations`)
}

export function useRelationQuery(roomId, relationId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/relations/${relationId}`)
}

export function useStudentRelationRefsQuery(roomId, studentId) {
  const swr = useSWR([roomId, studentId, 'relations'], getStudentRelationRefs)
  return expandSWR(swr)
}

export function useTeacherRelationRefsQuery(roomId, teacherId) {
  const swr = useSWR([roomId, teacherId], getTeacherRelationRefs)
  return expandSWR(swr)
}

export function useParentsRelationRefsQuery(roomId, parentId) {
  const swr = useSWR([roomId, parentId], getParentRelationRefs)
  return expandSWR(swr)
}

export function useCreateRelationMutation (roomId) {
  return useCreateDocMutation(roomId && `/rooms/${roomId}/relations`)
}

export function useUpdateRelationMutation (roomId, relationId) {
  return useUpdateDocMutation(roomId && relationId && `/rooms/${roomId}/relations/${relationId}`)
}

export function useDeleteRelationMutation (roomId, relationId) {
  return useDeleteDocMutation(roomId && relationId && `/rooms/${roomId}/relations/${relationId}`)
}

export function useCreateStudentRelationMutation (roomId, studentId) {
  return useMutation(
    async ({ destination, ...relation }) => await createRelation(roomId, {
      ...relation,
      departure  : getStudentRef(roomId, studentId),
      destination: getAccountRef(roomId, destination),
    })
  )
}

export function useCreateTeacherRelationMutation (roomId, teacherId) {
  return useMutation(
    async ({ destination, ...relation }) => await createRelation(roomId, {
      ...relation,
      departure  : getTeacherRef(roomId, teacherId),
      destination: getAccountRef(roomId, destination),
    })
  )
}

export function useGetRelationLabel () {
  return useCallback((relation) => {
    const startedAt = relation.startedAt.toDate()
    const finishedAt = relation.finishedAt.toDate()

    return `${format(startedAt, 'yyyy/MM/dd HH:mm')} ~ ${format(finishedAt, 'yyyy/MM/dd HH:mm')}`
  }, [])
}
