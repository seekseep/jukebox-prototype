import {
  getFirestore,
  collection, doc,
  getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { app } from '../../firebase'

import { docToData } from './utils'

export function getStudentsRef (schoolId, roomId) {
  const firestore = getFirestore(app)
  return collection(firestore, `schools/${schoolId}/rooms/${roomId}/students`)
}

export function getStudentRef (schoolId, roomId, studentId) {
  const studentsRef = getStudentsRef(schoolId, roomId)
  return doc(studentsRef, studentId)
}

export async function createStudent(schoolId, roomId, data) {
  const studentsRef = getStudentsRef(schoolId, roomId)

  const studentRef = await addDoc(studentsRef, data)

  const studentSnapshot = await getDoc(studentRef)
  const createdStudent = docToData(studentSnapshot)

  return createdStudent
}

export async function updateStudent (schoolId, roomId, studentId, data, { merge = true } = { }) {
  const studentRef = getStudentRef(schoolId, roomId, studentId)

  await updateDoc(studentRef, data, { merge })

  const studentSnapshot = await getDoc(studentRef)
  const updatedStudent = docToData(studentSnapshot)

  return updatedStudent
}

export async function deleteStudent (schoolId, roomId, studentId) {
  const studentRef = getStudentRef(schoolId, roomId, studentId)

  await deleteDoc(studentRef)

  return null
}

export async function getStudentSubjects (schoolId, roomId, studentId) {
  const studentRef = getStudentRef(schoolId, roomId, studentId)
  const studentSnapshot = await getDoc(studentRef)
  const student = docToData(studentSnapshot)

  if (!student.subjects) return []

  const subjects = []
  for (let subjectRef of student.subjects) {
    const subjectSnapshot = await getDoc(subjectRef)
    const subject = docToData(subjectSnapshot)
    subjects.push(subject)
  }

  return subjects
}

export async function getStudentRelations (schoolId, roomId, studentId) {
  const studentRef = getStudentRef(schoolId, roomId, studentId)
  const studentSnapshot = await getDoc(studentRef)
  const student = docToData(studentSnapshot)

  return student.relations || []
}

export async function getStudentSchedules (schoolId, roomId, studentId) {
  const studentRef = getStudentRef(schoolId, roomId, studentId)
  const studentSnapshot = await getDoc(studentRef)
  const student = docToData(studentSnapshot)

  return student.schedules || []
}
