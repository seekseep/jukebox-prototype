import { getFirestore, collection, doc } from 'firebase/firestore'
import { app } from '../../firebase'
import { createResource, deleteResource, updateResource } from './utils'

export function getSubjectsRef (roomId) {
  const firestore = getFirestore(app)
  return collection(firestore, `rooms/${roomId}/subjects`)
}

export function getSubjectRef (roomId, subjectId) {
  const subjectsRef = getSubjectsRef(roomId)
  return doc(subjectsRef, subjectId)
}

export async function createSubject(roomId, data) {
  const subjectsRef = getSubjectsRef(roomId)
  return await createResource(subjectsRef, data)
}

export async function updateSubject (roomId, subjectId, data, { marge = true } = { }) {
  const subjectRef = getSubjectRef(roomId, subjectId)
  return await updateResource(subjectRef, data, { marge })
}

export async function deleteSubject (roomId, subjectId) {
  const subjectRef = getSubjectRef(roomId, subjectId)
  return await deleteResource(subjectRef)
}
