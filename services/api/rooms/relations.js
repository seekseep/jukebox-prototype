import { collection, doc, query, where, getDocs } from 'firebase/firestore'
import { firestore } from '@/firebase'
import { createResource, deleteResource, updateResource, querySnapshotToRefs } from '@/services/api/utils'
import { getStudentRef } from '@/services/api/rooms/students'
import { getTeacherRef } from '@/services/api/rooms/teachers'
import { getAccountRef } from '@/services/api/rooms/accounts'

export function getRelationsRef (roomId) {
  return collection(firestore, `/rooms/${roomId}/relations`)
}

export function getRelationRef (roomId, relationId) {
  return doc(getRelationsRef(roomId), relationId)
}

export async function getRelationRefsByDepartureAccountRef (roomId, accountRef) {
  const relationsQuery = query(getRelationsRef(roomId), where('departure', '==', accountRef))
  const querySnapshot = await getDocs(relationsQuery)
  return querySnapshotToRefs(querySnapshot)
}

export async function getStudentRelationRefs (roomId, studentId) {
  return getRelationRefsByDepartureAccountRef(roomId, getStudentRef(roomId, studentId))
}

export async function getTeacherRelationRefs (roomId, teacherId) {
  return getRelationRefsByDepartureAccountRef(roomId, getTeacherRef(roomId, teacherId))
}

export async function getParentRelationRefs (roomId, parentId) {
  return getRelationRefsByDepartureAccountRef(roomId, getAccountRef(roomId, parentId))
}

export async function createRelation(roomId, data) {
  const relationsRef = getRelationsRef(roomId)
  return await createResource(relationsRef, data)
}

export async function updateRelation (roomId, relationId, data) {
  const relationRef = getRelationRef(roomId, relationId)
  return await updateResource(relationRef, data)
}

export async function deleteRelation (roomId, relationId) {
  const relationRef = getRelationRef(roomId, relationId)
  return await deleteResource(relationRef)
}
