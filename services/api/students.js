import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'

import { app } from '../../firebase'

import { createResource, deleteResource, docSnapshotToData, updateResource } from './utils'

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
  return await createResource(studentsRef, data)
}

export async function updateStudent (roomId, studentId, data, { marge = true } = { }) {
  const studentRef = getStudentRef(roomId, studentId)
  return await updateResource(studentRef, data, { marge })
}

export async function deleteStudent (roomId, studentId) {
  const studentRef = getStudentRef(roomId, studentId)
  return await deleteResource(studentRef)
}

function getStudentSchedulesRef (roomId, studentId) {
  const firestore = getFirestore(app)
  return collection(firestore, `/rooms/${roomId}/students/${studentId}/schedules`)
}

function getStudentScheduleRef (roomId, studentId, scheduleId) {
  const schedulesRef = getStudentSchedulesRef(roomId, studentId)
  return doc(schedulesRef, scheduleId)
}

export async function createStudentSchedule(roomId, studentId, data) {
  const schedulesRef = getStudentSchedulesRef(roomId, studentId)
  return await createResource(schedulesRef, data)
}

export async function updateStudentSchedule(roomId, studentId, scheduleId, data, { marge = true } = {}) {
  const scheduleRef = getStudentScheduleRef(roomId, studentId, scheduleId)
  return await updateResource(scheduleRef, data, { marge })
}

export async function deleteStudentSchedule(roomId, studentId, scheduleId) {
  const scheduleRef = getStudentScheduleRef(roomId, studentId, scheduleId)
  return await deleteResource(scheduleRef)
}

function getStudentRelationsRef (roomId, studentId) {
  const firestore = getFirestore(app)
  return collection(firestore, `/rooms/${roomId}/students/${studentId}/relations`)
}

function getStudentRelationRef (roomId, studentId, relationId) {
  const relationsRef = getStudentRelationsRef(roomId, studentId)
  return doc(relationsRef, relationId)
}

export async function createStudentRelation(roomId, studentId, data) {
  const relationsRef = getStudentRelationsRef(roomId, studentId)
  return await createResource(relationsRef, data)
}

export async function updateStudentRelation(roomId, studentId, relationId, data, { marge = true } = {}) {
  const scheduleRef = getStudentRelationRef(roomId, studentId, relationId)
  return await updateResource(scheduleRef, data, { marge })
}

export async function deleteStudentRelation(roomId, studentId, relationId) {
  const scheduleRef = getStudentRelationRef(roomId, studentId, relationId)
  return await deleteResource(scheduleRef)
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
