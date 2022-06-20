import { doc } from 'firebase/firestore'
import { createResource, deleteResource, updateResource } from '@/services/api/utils'
import { getAccountsRef } from './accounts'

export function getStudentsRef (roomId) {
  return getAccountsRef(roomId)
}

export function getStudentRef (roomId, studentId) {
  const studentsRef = getStudentsRef(roomId)
  return doc(studentsRef, studentId)
}

export async function createStudent(roomId, data) {
  const studentsRef = getStudentsRef(roomId)
  return await createResource(studentsRef, data)
}

export async function updateStudent (roomId, studentId, data) {
  const studentRef = getStudentRef(roomId, studentId)
  return await updateResource(studentRef, data)
}

export async function deleteStudent (roomId, studentId) {
  const studentRef = getStudentRef(roomId, studentId)
  return await deleteResource(studentRef)
}
