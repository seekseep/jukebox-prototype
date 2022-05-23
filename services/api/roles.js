import { collection, doc, query, where, getDocs } from 'firebase/firestore'

import { firestore } from '@/firebase'
import { createResource, deleteResource, updateResource, querySnapshotToRefs, docsSnapshotToObjects } from '@/services/api/utils'
import { RESOURCE_TYPE } from '@/constatnts'
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

export async function getRolesByUserRef (userRef) {
  const rolesQuery = query(getRolesRef(), where('user', '==', userRef))
  const querySnapshot = await getDocs(rolesQuery)
  return docsSnapshotToObjects(querySnapshot)
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
