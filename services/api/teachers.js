import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import { app } from '../../firebase'
import { createResource, deleteResource, docSnapshotToData, updateResource } from './utils'

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
  return await createResource(teachersRef, data)
}

export async function updateTeacher (roomId, teacherId, data, { marge = true } = { }) {
  const teacherRef = getTeacherRef(roomId, teacherId)
  return await updateResource(teacherRef, data, { marge })
}

export async function deleteTeacher (roomId, teacherId) {
  const teacherRef = getTeacherRef(roomId, teacherId)
  return await deleteResource(teacherRef)
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

function getTeacherSchedulesRef (roomId, teacherId) {
  const firestore = getFirestore(app)
  return collection(firestore, `/rooms/${roomId}/teachers/${teacherId}/schedules`)
}

function getTeacherScheduleRef (roomId, teacherId, scheduleId) {
  const schedulesRef = getTeacherSchedulesRef(roomId, teacherId)
  return doc(schedulesRef, scheduleId)
}

export async function createTeacherSchedule(roomId, teacherId, data) {
  const schedulesRef = getTeacherSchedulesRef(roomId, teacherId)
  return await createResource(schedulesRef, data)
}

export async function updateTeacherSchedule(roomId, teacherId, scheduleId, data, { marge = true } = {}) {
  const scheduleRef = getTeacherScheduleRef(roomId, teacherId, scheduleId)
  return await updateResource(scheduleRef, data, { marge })
}

export async function deleteTeacherSchedule(roomId, teacherId, scheduleId) {
  const scheduleRef = getTeacherScheduleRef(roomId, teacherId, scheduleId)
  return await deleteResource(scheduleRef)
}

function getTeacherRelationsRef (roomId, teacherId) {
  const firestore = getFirestore(app)
  return collection(firestore, `/rooms/${roomId}/teachers/${teacherId}/relations`)
}

function getTeacherRelationRef (roomId, teacherId, relationId) {
  const relationsRef = getTeacherRelationsRef(roomId, teacherId)
  return doc(relationsRef, relationId)
}

export async function createTeacherRelation(roomId, teacherId, data) {
  const relationsRef = getTeacherRelationsRef(roomId, teacherId)
  return await createResource(relationsRef, data)
}

export async function updateTeacherRelation(roomId, teacherId, relationId, data, { marge = true } = {}) {
  const scheduleRef = getTeacherRelationRef(roomId, teacherId, relationId)
  return await updateResource(scheduleRef, data, { marge })
}

export async function deleteTeacherRelation(roomId, teacherId, relationId) {
  const scheduleRef = getTeacherRelationRef(roomId, teacherId, relationId)
  return await deleteResource(scheduleRef)
}
