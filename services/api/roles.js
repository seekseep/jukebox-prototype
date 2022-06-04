import { collection, doc, query, where, getDocs, getDoc } from 'firebase/firestore'

import { firestore } from '@/firebase'
import { createResource, deleteResource, updateResource, querySnapshotToRefs, querySnapshotToObjects, docSnapshotToObject } from '@/services/api/utils'
import { RESOURCE_TYPE } from '@/constants'
import { getUserRef } from './users'

export function getRolesRef () {
  return collection(firestore, '/roles')
}

export function getRoleRef (roleId) {
  return doc(getRolesRef(), roleId)
}

export async function getRoleRefsByUserRef (userRef) {
  const rolesQuery = query(getRolesRef(), where('user', '==', userRef))
  const querySnapshot = await getDocs(rolesQuery)
  return querySnapshotToRefs(querySnapshot)
}

export async function getRolesByUser (userRef) {
  const rolesQuery = query(getRolesRef(), where('user', '==', userRef))
  const querySnapshot = await getDocs(rolesQuery)
  return querySnapshotToObjects(querySnapshot)
}

export async function getRolesByUserRefAndResourceType (userRef, resourceType) {
  const rolesQuery = query(getRolesRef(), where('user', '==', userRef), where('resourceType', '==', resourceType))
  const querySnapshot = await getDocs(rolesQuery)
  return querySnapshotToRefs(querySnapshot)
}

export async function getUserSchoolRoleRefs (userId) {
  const userRef = getUserRef(userId)
  return getRolesByUserRefAndResourceType(userRef, RESOURCE_TYPE.SCHOOL)
}

export async function getUserRoomRoleRefs (userId) {
  const userRef = getUserRef(userId)
  return getRolesByUserRefAndResourceType(userRef, RESOURCE_TYPE.ROOM)
}

export async function createRole(data) {
  const rolesRef = getRolesRef()

  const {
    account: accountRef,
    user: userRef
  } = data

  const accountSnapshot = await getDoc(accountRef)
  if(!accountSnapshot.exists) throw Error('account does not exist')

  const userSnapshot = await getDoc(userRef)
  if(!userSnapshot.exists) throw Error('user does not exist')

  return await createResource(rolesRef, data)
}

export async function updateRole (roleId, data) {
  const roleRef = getRoleRef(roleId)
  return await updateResource(roleRef, data)
}

export async function deleteRole (roleId) {
  const roleRef = getRoleRef(roleId)
  return await deleteResource(roleRef)
}

export async function getRoleByResourceAndAccount(resourceRef, accountRef) {
  const rolesRef = getRolesRef()
  const rolesQuery = query(
    rolesRef,
    where('resource', '==', resourceRef),
    where('account', '==', accountRef)
  )
  const snapshot = await getDocs(rolesQuery)

  if (snapshot.empty) return null

  return docSnapshotToObject(snapshot.docs[0])
}

export async function getRoleByResourceAndUser(resourceRef, userRef) {
  const rolesRef = getRolesRef()
  const rolesQuery = query(
    rolesRef,
    where('resource', '==', resourceRef),
    where('user', '==', userRef)
  )
  const snapshot = await getDocs(rolesQuery)

  if (snapshot.empty) return null

  return docSnapshotToObject(snapshot.docs[0])
}
