import { collection, doc } from 'firebase/firestore'
import { firestore } from '@/firebase'
import { createResource, deleteResource, updateResource } from './utils'

export function getSheetsRef (roomId) {
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

export async function updateSheet (roomId, sheetId, data) {
  const sheetRef = getSheetRef(roomId, sheetId)
  return await updateResource(sheetRef, data)
}

export async function deleteSheet (roomId, sheetId) {
  const sheetRef = getSheetRef(roomId, sheetId)
  return await deleteResource(sheetRef)
}
