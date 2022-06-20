import { useMemo } from 'react'
import { refEqual } from 'firebase/firestore'

import { getAccountRef } from '@rooms/services/api/accounts'
import { getStudentRef } from '@rooms/services/api/students'
import { getTeacherRef } from '@rooms/services/api/teachers'
import { createRelation } from '@rooms/services/api/relations'

import {
  useMutation,
  useDocAsObjectQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation,
  useCollectionAsObjectArrayQuery
} from '@/hooks/api'

export function useRelationsQuery(roomId) {
  return useCollectionAsObjectArrayQuery(roomId && `/rooms/${roomId}/relations`)
}

export function useRelationQuery(roomId, relationId) {
  return useDocAsObjectQuery(roomId && relationId && `/rooms/${roomId}/relations/${relationId}`)
}

export function useResourceRelationsQuery(roomId, resourceRef) {
  const { data: relations, ...result } = useRelationsQuery(roomId)

  const resourceRelation = useMemo(() => {
    if (!relations || !resourceRef) return relations
    return relations.filter(relation => refEqual(relation.departure, resourceRef))
  }, [relations, resourceRef])

  return { data: resourceRelation, ...result }
}

export function useStudentRelationsQuery(roomId, studentId) {
  return useResourceRelationsQuery(roomId, roomId && studentId && getStudentRef(roomId, studentId))
}

export function useTeacherRelationsQuery(roomId, teacherId) {
  return useResourceRelationsQuery(roomId, roomId && teacherId && getTeacherRef(roomId, teacherId))
}

export function useSheetRelationsQuery(roomId, sheetId) {
  return useResourceRelationsQuery(roomId, roomId && sheetId && getSheetRef(roomId, sheetId))
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
