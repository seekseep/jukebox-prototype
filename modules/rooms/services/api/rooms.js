import { collection, doc, getDoc, addDoc, getDocs, query, where, runTransaction } from 'firebase/firestore'

import { RESOURCE_TYPE } from '@/constants'
import { ACCOUNT_TYPE } from '@rooms/constants'

import { firestore } from '@/firebase'

import { createResource, deleteResource, querySnapshotToRefs, updateResource, docSnapshotToObject } from '@/services/api/utils'
import { getRolesRef } from '@/services/api/roles'

import { getAccountsRef } from '@rooms/services/api/accounts'
import { getSchoolRef } from '@rooms/services/api/schools'

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

export async function setUpRoom (data, userRef, schoolRef) {
  return await runTransaction(firestore, async () => {
    const roomsRef = getRoomsRef()
    const roomRef = await addDoc(roomsRef, {
      ...data,
      school: schoolRef,
    })

    const userSnapshot = await getDoc(userRef)
    const user = docSnapshotToObject(userSnapshot)

    const accountsRef = getAccountsRef(roomRef.id)
    const accountRef = await addDoc(accountsRef, {
      name: user.name,
      type: ACCOUNT_TYPE.TEACHER
    })

    const rolesRef = getRolesRef()
    await addDoc(rolesRef, {
      account     : accountRef,
      user        : userRef,
      resource    : roomRef,
      resourceType: RESOURCE_TYPE.ROOM
    })

    const roomSnapshot = await getDoc(roomRef)
    return docSnapshotToObject(roomSnapshot)
  })
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
