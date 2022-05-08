import {
  getFirestore,
  collection, doc,
  getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { app } from '../../firebase'

import { docSnapshotToData } from './utils'

export function getStudentsRef (roomId) {
  const firestore = getFirestore(app)
  return collection(firestore, `rooms/${roomId}/students`)
}

export function getStudentRef (roomId, studentId) {
  const studentsRef = getStudentsRef(roomId)
  return doc(studentsRef, studentId)
}

export async function createStudent(roomId, data) {
  const studentsRef = getStudentsRef(roomId)

  const studentRef = await addDoc(studentsRef, data)

  const studentSnapshot = await getDoc(studentRef)
  const createdStudent = docSnapshotToData(studentSnapshot)

  return createdStudent
}

export async function updateStudent (roomId, studentId, data, { merge = true } = { }) {
  const studentRef = getStudentRef(roomId, studentId)

  await updateDoc(studentRef, data, { merge })

  const studentSnapshot = await getDoc(studentRef)
  const updatedStudent = docSnapshotToData(studentSnapshot)

  return updatedStudent
}

export async function deleteStudent (roomId, studentId) {
  const studentRef = getStudentRef(roomId, studentId)

  await deleteDoc(studentRef)

  return null
}

export async function getStudentSubjects (roomId, studentId) {
  const studentRef = getStudentRef(roomId, studentId)
  const studentSnapshot = await getDoc(studentRef)
  const student = docSnapshotToData(studentSnapshot)

  if (!student.subjects) return []

  const subjects = []
  for (let subjectRef of student.subjects) {
    const subjectSnapshot = await getDoc(subjectRef)
    const subject = docSnapshotToData(subjectSnapshot)
    subjects.push(subject)
  }

  return subjects
}

export async function getStudentRelations (roomId, studentId) {
  const studentRef = getStudentRef(roomId, studentId)
  const studentSnapshot = await getDoc(studentRef)
  const student = docSnapshotToData(studentSnapshot)

  return student.relations || []
}

export async function getStudentSchedules (roomId, studentId) {
  const studentRef = getStudentRef(roomId, studentId)
  const studentSnapshot = await getDoc(studentRef)
  const student = docSnapshotToData(studentSnapshot)

  return student.schedules || []
}
