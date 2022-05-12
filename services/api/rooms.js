import {
  collection, doc,
  query, where,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { firestore } from '../../firebase'
import { getSchoolRef } from './schools'

import { docSnapshotToData, collectionSnapshotToDataArray, createResource, updateResource, deleteResource } from './utils'

export function getRoomsRef () {
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
  return await createResource(roomsRef, data)
}

export async function updateRoom (roomId, data, { marge = true } = { }) {
  const roomRef = getRoomRef(roomId)
  return await updateResource(roomRef,data, { marge })
}

export async function deleteRoom (roomId) {
  const roomRef = getRoomRef(roomId)
  return await deleteResource(roomRef)
}
