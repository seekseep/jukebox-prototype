import {
  collection, doc,
  getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { firestore } from '../../firebase'

import { docSnapshotToData } from './utils'

export function getSheetsRef (roomId) {
  return collection(firestore, `rooms/${roomId}/sheets`)
}

export function getSheetRef (roomId, sheetId) {
  const sheetsRef = getSheetsRef(roomId)
  return doc(sheetsRef, sheetId)
}

export async function createSheet(roomId, data) {
  const sheetsRef = getSheetsRef(roomId)

  const sheetRef = await addDoc(sheetsRef, data)

  const sheetSnapshot = await getDoc(sheetRef)
  const createdSheet = docSnapshotToData(sheetSnapshot)

  return createdSheet
}

export async function updateSheet (roomId, sheetId, data, { merge = true } = { }) {
  const sheetRef = getSheetRef(roomId, sheetId)

  await updateDoc(sheetRef, data, { merge })

  const sheetSnapshot = await getDoc(sheetRef)
  const updatedSheet = docSnapshotToData(sheetSnapshot)

  return updatedSheet
}

export async function deleteSheet (roomId, sheetId) {
  const sheetRef = getSheetRef(roomId, sheetId)

  await deleteDoc(sheetRef)

  return null
}

export async function getSheetSchedules (roomId, sheetId) {
  const sheetRef = getSheetRef(roomId, sheetId)
  const sheetSnapshot = await getDoc(sheetRef)
  const sheet = docSnapshotToData(sheetSnapshot)

  return sheet.schedules || []
}
