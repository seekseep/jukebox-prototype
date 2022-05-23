import { doc } from 'firebase/firestore'
import { createResource, deleteResource, updateResource } from '../utils'
import { getAccountsRef } from './accounts'

export function getParentsRef (roomId) {
  return getAccountsRef(roomId)
}

export function getParentRef (roomId, parentId) {
  const parentsRef = getParentsRef(roomId)
  return doc(parentsRef, parentId)
}

export async function createParent(roomId, data) {
  const parentsRef = getParentsRef(roomId)
  return await createResource(parentsRef, data)
}

export async function updateParent (roomId, parentId, data) {
  const parentRef = getParentRef(roomId, parentId)
  return await updateResource(parentRef, data)
}

export async function deleteParent (roomId, parentId) {
  const parentRef = getParentRef(roomId, parentId)
  return await deleteResource(parentRef)
}
