import { collection, doc } from 'firebase/firestore'
import { firestore } from '@/firebase'
import { createResource, deleteResource, updateResource } from './utils'

export function getUsersRef () {
  return collection(firestore, '/users')
}

export function getUserRef (userId) {
  return doc(getUsersRef(), userId)
}

export async function createUser(data) {
  const usersRef = getUsersRef()
  return await createResource(usersRef, data)
}

export async function updateUser (userId, data) {
  const userRef = getUserRef(userId)
  return await updateResource(userRef, data)
}

export async function deleteUser (userId) {
  const userRef = getUserRef(userId)
  return await deleteResource(userRef)
}
