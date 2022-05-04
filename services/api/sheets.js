import {
  getFirestore,
  collection, doc,
  getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { app } from '../../firebase'

import { docToData } from './utils'

export function getSheetsRef (schoolId, roomId) {
  const firestore = getFirestore(app)
  return collection(firestore, `schools/${schoolId}/rooms/${roomId}/sheets`)
}

export function getSheetRef (schoolId, roomId, sheetId) {
  const sheetsRef = getSheetsRef(schoolId, roomId)
  return doc(sheetsRef, sheetId)
}

export async function createSheet(schoolId, roomId, data) {
  const sheetsRef = getSheetsRef(schoolId, roomId)

  const sheetRef = await addDoc(sheetsRef, data)

  const sheetSnapshot = await getDoc(sheetRef)
  const createdSheet = docToData(sheetSnapshot)

  return createdSheet
}

export async function updateSheet (schoolId, roomId, sheetId, data, { merge = true } = { }) {
  const sheetRef = getSheetRef(schoolId, roomId, sheetId)

  await updateDoc(sheetRef, data, { merge })

  const sheetSnapshot = await getDoc(sheetRef)
  const updatedSheet = docToData(sheetSnapshot)

  return updatedSheet
}

export async function deleteSheet (schoolId, roomId, sheetId) {
  const sheetRef = getSheetRef(schoolId, roomId, sheetId)

  await deleteDoc(sheetRef)

  return null
}

export async function getSheetSchedules (schoolId, roomId, sheetId) {
  const sheetRef = getSheetRef(schoolId, roomId, sheetId)
  const sheetSnapshot = await getDoc(sheetRef)
  const sheet = docToData(sheetSnapshot)

  return sheet.schedules || []
}
