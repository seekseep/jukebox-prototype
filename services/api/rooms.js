import {
  getFirestore,
  collection, doc,
  query, where,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { app } from '../../firebase'
import { getSchoolRef } from './schools'

import { docSnapshotToData, collectionSnapshotToDataArray } from './utils'

export function getRoomsRef () {
  const firestore = getFirestore(app)
  return collection(firestore, 'rooms')
}

export function getRoomRef (roomId) {
  const schoolsRef = getRoomsRef()
  return doc(schoolsRef, roomId)
}

export async function getSchoolRooms (schoolId) {
  const roomsRef = getRoomsRef()
  const schoolRef = getSchoolRef(schoolId)
  const roomsBySchoolQuery = query(roomsRef, where('school', '==', schoolRef))
  const snapshot = await getDocs(roomsBySchoolQuery)
  return collectionSnapshotToDataArray(snapshot)
}

export async function createRoom(data) {
  const roomsRef = getRoomsRef()

  const roomRef = await addDoc(roomsRef, data)

  const roomSnapshot = await getDoc(roomRef)
  const createdRoom = docSnapshotToData(roomSnapshot)

  return createdRoom
}

export async function updateRoom (roomId, data, { merge = true } = { }) {
  const roomRef = getRoomRef(roomId)

  await updateDoc(roomRef, data, { merge })

  const roomSnapshot = await getDoc(roomRef)
  const updatedRoom = docSnapshotToData(roomSnapshot)

  return updatedRoom
}

export async function deleteRoom (roomId) {
  const roomRef = getRoomRef(roomId)

  await deleteDoc(roomRef)

  return null
}
