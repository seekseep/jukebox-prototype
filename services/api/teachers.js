import { doc } from 'firebase/firestore'
import { createResource, deleteResource, updateResource } from './utils'
import { getAccountsRef } from './accounts'

export function getTeachersRef (roomId) {
  return getAccountsRef(roomId)
}

export function getTeacherRef (roomId, teacherId) {
  const teachersRef = getTeachersRef(roomId)
  return doc(teachersRef, teacherId)
}

export async function createTeacher(roomId, data) {
  const teachersRef = getTeachersRef(roomId)
  return await createResource(teachersRef, data)
}

export async function updateTeacher (roomId, teacherId, data) {
  const teacherRef = getTeacherRef(roomId, teacherId)
  return await updateResource(teacherRef, data)
}

export async function deleteTeacher (roomId, teacherId) {
  const teacherRef = getTeacherRef(roomId, teacherId)
  return await deleteResource(teacherRef)
}
