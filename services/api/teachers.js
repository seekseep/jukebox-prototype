import {
  getFirestore,
  collection, doc,
  getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { app } from '../../firebase'

import { docSnapshotToData } from './utils'

export function getTeachersRef (roomId) {
  const firestore = getFirestore(app)
  return collection(firestore, `rooms/${roomId}/teachers`)
}

export function getTeacherRef (roomId, teacherId) {
  const teachersRef = getTeachersRef(roomId)
  return doc(teachersRef, teacherId)
}

export async function createTeacher(roomId, data) {
  const teachersRef = getTeachersRef(roomId)

  const teacherRef = await addDoc(teachersRef, data)

  const teacherSnapshot = await getDoc(teacherRef)
  const createdTeacher = docSnapshotToData(teacherSnapshot)

  return createdTeacher
}

export async function updateTeacher (roomId, teacherId, data, { merge = true } = { }) {
  const teacherRef = getTeacherRef(roomId, teacherId)

  await updateDoc(teacherRef, data, { merge })

  const teacherSnapshot = await getDoc(teacherRef)
  const updatedTeacher = docSnapshotToData(teacherSnapshot)

  return updatedTeacher
}

export async function deleteTeacher (roomId, teacherId) {
  const teacherRef = getTeacherRef(roomId, teacherId)

  await deleteDoc(teacherRef)

  return null
}

export async function getTeacherSubjects (roomId, teacherId) {
  const teacherRef = getTeacherRef(roomId, teacherId)
  const teacherSnapshot = await getDoc(teacherRef)
  const teacher = docSnapshotToData(teacherSnapshot)

  if (!teacher.subjects) return []

  const subjects = []
  for (let subjectRef of teacher.subjects) {
    const subjectSnapshot = await getDoc(subjectRef)
    const subject = docSnapshotToData(subjectSnapshot)
    subjects.push(subject)
  }

  return subjects
}

export async function getTeacherSchedules (roomId, teacherId) {
  const teacherRef = getTeacherRef(roomId, teacherId)
  const teacherSnapshot = await getDoc(teacherRef)
  const teacher = docSnapshotToData(teacherSnapshot)

  return teacher.schedules || []
}

export async function getTeacherRelations (roomId, teacherId) {
  const teacherRef = getTeacherRef(roomId, teacherId)
  const teacherSnapshot = await getDoc(teacherRef)
  const teacher = docSnapshotToData(teacherSnapshot)

  return teacher.relations || []
}
