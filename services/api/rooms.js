import {
  getFirestore,
  collection, doc,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { app } from '../../firebase'

import { docToData } from './utils'

export function getRoomsRef (schoolId) {
  const firestore = getFirestore(app)
  return collection(firestore, `schools/${schoolId}/rooms`)
}

export function getRoomRef (schoolId, roomId) {
  const schoolsRef = getRoomsRef(schoolId)
  return doc(schoolsRef, roomId)
}

export async function createRoom(schoolId, data) {
  const roomsRef = getRoomsRef(schoolId)

  const roomRef = await addDoc(roomsRef, data)

  const roomSnapshot = await getDoc(roomRef)
  const createdRoom = docToData(roomSnapshot)

  return createdRoom
}

export async function updateRoom (schoolId, roomId, data, { merge = true } = { }) {
  const roomRef = getRoomRef(schoolId, roomId)

  await updateDoc(roomRef, data, { merge })

  const roomSnapshot = await getDoc(roomRef)
  const updatedRoom = docToData(roomSnapshot)

  return updatedRoom
}

export async function deleteRoom (schoolId, roomId) {
  const roomRef = getRoomRef(schoolId, roomId)

  await deleteDoc(roomRef)

  return null
}
