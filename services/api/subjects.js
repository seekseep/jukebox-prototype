import {
  collection, doc,
  getDoc, addDoc, updateDoc, deleteDoc,
} from 'firebase/firestore'
import { firestore } from '../../firebase'
import { docSnapshotToData } from './utils'

export function getSubjectsRef (roomId) {
  return collection(firestore, `rooms/${roomId}/subjects`)
}

export function getSubjectRef (roomId, subjectId) {
  const subjectsRef = getSubjectsRef(roomId)
  return doc(subjectsRef, subjectId)
}

export async function createSubject(roomId, data) {
  const subjectsRef = getSubjectsRef(roomId)

  const subjectRef = await addDoc(subjectsRef, data)

  const subjectSnapshot = await getDoc(subjectRef)
  const createdSubject = docSnapshotToData(subjectSnapshot)

  return createdSubject
}

export async function updateSubject (roomId, subjectId, data, { merge = true } = { }) {
  const subjectRef = getSubjectRef(roomId, subjectId)

  await updateDoc(subjectRef, data, { merge })

  const subjectSnapshot = await getDoc(subjectRef)
  const updatedSubject = docSnapshotToData(subjectSnapshot)

  return updatedSubject
}

export async function deleteSubject (roomId, subjectId) {
  const subjectRef = getSubjectRef(roomId, subjectId)

  await deleteDoc(subjectRef)

  return null
}
