import { collection, doc, getDocs, query, where } from 'firebase/firestore'

import { firestore } from '@/firebase'
import { getStudentRef } from '@/services/api/students'
import { getTeacherRef } from '@/services/api/teachers'
import { getSheetRef } from '@/services/api/sheets'

import { createResource, deleteResource, querySnapshotToRefs, updateResource } from './utils'
import { getRoomRef } from './rooms'

export function getSchedulesRef (roomId) {
  return collection(firestore, `/rooms/${roomId}/schedules`)
}

export function getScheduleRef (roomId, scheduleId) {
  return doc(getSchedulesRef(roomId), scheduleId)
}

export async function getScheduleRefsByResourceRef(roomId, resourceRef) {
  const schedulesQuery = query(getSchedulesRef(roomId), where('resource', '==', resourceRef))
  const querySnapshot = await getDocs(schedulesQuery)
  return querySnapshotToRefs(querySnapshot)
}

export async function getRoomScheduleRefs(roomId) {
  return await getScheduleRefsByResourceRef(roomId, getRoomRef(roomId))
}

export async function getStudentScheduleRefs(roomId, studentId) {
  return await getScheduleRefsByResourceRef(roomId, getStudentRef(roomId, studentId))
}

export async function getTeacherScheduleRefs(roomId, teacherId) {
  return await getScheduleRefsByResourceRef(roomId, getTeacherRef(roomId, teacherId))
}

export async function getSheetScheduleRefs(roomId, sheetId) {
  return await getScheduleRefsByResourceRef(roomId, getSheetRef(roomId, sheetId))
}

export async function createSchedule(roomId, data) {
  const schedulesRef = getSchedulesRef(roomId)
  return await createResource(schedulesRef, data)
}

export async function updateSchedule (roomId, scheduleId, data) {
  const scheduleRef = getScheduleRef(roomId, scheduleId)
  return await updateResource(scheduleRef, data)
}

export async function deleteSchedule (roomId, scheduleId) {
  const scheduleRef = getScheduleRef(roomId, scheduleId)
  return await deleteResource(scheduleRef)
}
