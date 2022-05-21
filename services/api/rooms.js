import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '@/firebase'
import { getSchoolRef } from '@/services/api/schools'
import { createResource, deleteResource, querySnapshotToRefs, updateResource } from './utils'

export function getRoomsRef () {
  return collection(firestore, '/rooms')
}

export function getRoomRef (roomId) {
  return doc(getRoomsRef(), roomId)
}

export async function getSchoolRoomRefs (schoolId) {
  const roomsQuery = query(getRoomsRef(), where('school', '==', getSchoolRef(schoolId)))
  const querySnapshot = await getDocs(roomsQuery)
  return querySnapshotToRefs(querySnapshot)
}

export async function createRoom(data) {
  const roomsRef = getRoomsRef()
  return await createResource(roomsRef, data)
}

export async function updateRoom (roomId, data) {
  const roomRef = getRoomRef(roomId)
  return await updateResource(roomRef, data)
}

export async function deleteRoom (roomId) {
  const roomRef = getRoomRef(roomId)
  return await deleteResource(roomRef)
}
