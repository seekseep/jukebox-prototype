import { getFirestore, collection, doc } from 'firebase/firestore'

import { app } from '../../firebase'

import { createResource, deleteResource, updateResource } from './utils'

export function getSheetsRef (roomId) {
  const firestore = getFirestore(app)
  return collection(firestore, `rooms/${roomId}/sheets`)
}

export function getSheetRef (roomId, sheetId) {
  const sheetsRef = getSheetsRef(roomId)
  return doc(sheetsRef, sheetId)
}

export async function createSheet(roomId, data) {
  const sheetsRef = getSheetsRef(roomId)
  return await createResource(sheetsRef, data)
}

export async function updateSheet (roomId, sheetId, data, { marge = true } = { }) {
  const sheetRef = getSheetRef(roomId, sheetId)
  return await updateResource(sheetRef, data, { marge })
}

export async function deleteSheet (roomId, sheetId) {
  const sheetRef = getSheetRef(roomId, sheetId)
  return await deleteResource(sheetRef)
}

function getSheetSchedulesRef (roomId, sheetId) {
  const firestore = getFirestore(app)
  return collection(firestore, `/rooms/${roomId}/sheets/${sheetId}/schedules`)
}

function getSheetScheduleRef (roomId, sheetId, scheduleId) {
  const schedulesRef = getSheetSchedulesRef(roomId, sheetId)
  return doc(schedulesRef, scheduleId)
}

export async function createSheetSchedule(roomId, sheetId, data) {
  const schedulesRef = getSheetSchedulesRef(roomId, sheetId)
  return await createResource(schedulesRef, data)
}

export async function updateSheetSchedule(roomId, sheetId, scheduleId, data, { marge = true } = {}) {
  const scheduleRef = getSheetScheduleRef(roomId, sheetId, scheduleId)
  return await updateResource(scheduleRef, data, { marge })
}

export async function deleteSheetSchedule(roomId, sheetId, scheduleId) {
  const scheduleRef = getSheetScheduleRef(roomId, sheetId, scheduleId)
  return await deleteResource(scheduleRef)
}
