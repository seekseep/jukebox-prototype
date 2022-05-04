import {
  getFirestore,
  collection, doc,
  getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { app } from '../../firebase'

import { docToData } from './utils'

export function getTeachersRef (schoolId, roomId) {
  const firestore = getFirestore(app)
  return collection(firestore, `schools/${schoolId}/rooms/${roomId}/teachers`)
}

export function getTeacherRef (schoolId, roomId, teacherId) {
  const teachersRef = getTeachersRef(schoolId, roomId)
  return doc(teachersRef, teacherId)
}

export async function createTeacher(schoolId, roomId, data) {
  const teachersRef = getTeachersRef(schoolId, roomId)

  const teacherRef = await addDoc(teachersRef, data)

  const teacherSnapshot = await getDoc(teacherRef)
  const createdTeacher = docToData(teacherSnapshot)

  return createdTeacher
}

export async function updateTeacher (schoolId, roomId, teacherId, data, { merge = true } = { }) {
  const teacherRef = getTeacherRef(schoolId, roomId, teacherId)

  await updateDoc(teacherRef, data, { merge })

  const teacherSnapshot = await getDoc(teacherRef)
  const updatedTeacher = docToData(teacherSnapshot)

  return updatedTeacher
}

export async function deleteTeacher (schoolId, roomId, teacherId) {
  const teacherRef = getTeacherRef(schoolId, roomId, teacherId)

  await deleteDoc(teacherRef)

  return null
}

export async function getTeacherSubjects (schoolId, roomId, teacherId) {
  const teacherRef = getTeacherRef(schoolId, roomId, teacherId)
  const teacherSnapshot = await getDoc(teacherRef)
  const teacher = docToData(teacherSnapshot)

  if (!teacher.subjects) return []

  const subjects = []
  for (let subjectRef of teacher.subjects) {
    const subjectSnapshot = await getDoc(subjectRef)
    const subject = docToData(subjectSnapshot)
    subjects.push(subject)
  }

  return subjects
}

export async function getTeacherSchedules (schoolId, roomId, teacherId) {
  const teacherRef = getTeacherRef(schoolId, roomId, teacherId)
  const teacherSnapshot = await getDoc(teacherRef)
  const teacher = docToData(teacherSnapshot)

  return teacher.schedules || []
}

export async function getTeacherRelations (schoolId, roomId, teacherId) {
  const teacherRef = getTeacherRef(schoolId, roomId, teacherId)
  const teacherSnapshot = await getDoc(teacherRef)
  const teacher = docToData(teacherSnapshot)

  return teacher.relations || []
}
