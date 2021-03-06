import { collection, doc, where, query, getDocs, getDoc, writeBatch } from 'firebase/firestore'

import { firestore } from '@/firebase'
import { createResource, deleteResource, updateResource, querySnapshotToRefs, docSnapshotToObject, querySnapshotToObjects } from '@/services/api/utils'
import { getRolesRef } from '@/services/api/roles'
import { getUserRef } from '@/services/api/users'

import { ACCOUNT_TYPE } from '@rooms/constants'
import { getRoomRef } from '@rooms/services/api/rooms'

export function getAccountsRef (roomId) {
  return collection(firestore, `/rooms/${roomId}/accounts`)
}

export function getAccountRef (roomId, accountId) {
  return doc(getAccountsRef(roomId), accountId)
}

export async function getAccountsByAccountType(roomId, accountType) {
  const accountsQuery = query(getAccountsRef(roomId), where('type', '==', accountType))
  const querySnapshot = await getDocs(accountsQuery)
  return querySnapshotToObjects(querySnapshot)
}

export async function getStudentAccounts (roomId) {
  return getAccountsByAccountType(roomId, ACCOUNT_TYPE.STUDENT)
}

export async function getTeacherAccounts (roomId) {
  return getAccountsByAccountType(roomId, ACCOUNT_TYPE.TEACHER)
}

export async function getParentAccounts (roomId) {
  return getAccountsByAccountType(roomId, ACCOUNT_TYPE.PARENT)
}

export async function getAccountRefsByAccountType (roomId, accountType) {
  const accountsQuery = query(getAccountsRef(roomId), where('type', '==', accountType))
  const querySnapshot = await getDocs(accountsQuery)
  return querySnapshotToRefs(querySnapshot)
}

export async function getStudentAccountRefs (roomId) {
  return getAccountRefsByAccountType(roomId, ACCOUNT_TYPE.STUDENT)
}

export async function getTeacherAccountRefs (roomId) {
  return getAccountRefsByAccountType(roomId, ACCOUNT_TYPE.TEACHER)
}

export async function getParentAccountRefs (roomId) {
  return getAccountRefsByAccountType(roomId, ACCOUNT_TYPE.PARENT)
}

export async function createAccount(roomId, data) {
  const accountsRef = getAccountsRef(roomId)
  return await createResource(accountsRef, data)
}

export async function updateAccount (roomId, accountId, data) {
  const accountRef = getAccountRef(roomId, accountId)
  return await updateResource(accountRef, data)
}

export async function  updateAccounts (roomId, accounts) {
  const batch = writeBatch(firestore)

  for (let { id: accountId, ...account } of accounts) {
    const accountRef = getAccountRef(roomId, accountId)
    batch.update(accountRef, account)
  }

  return await batch.commit()
}

export async function deleteAccount (roomId, accountId) {
  const accountRef = getAccountRef(roomId, accountId)
  return await deleteResource(accountRef)
}

export async function getAccountByUser (roomId, userId) {
  const rolesRef = getRolesRef()
  const rolesQuery = query(rolesRef,
    where('resource', '==', getRoomRef(roomId)),
    where('user', '==', getUserRef(userId))
  )
  const rolesSnapshot = await getDocs(rolesQuery)
  if (rolesSnapshot.empty) return

  const role = docSnapshotToObject(rolesSnapshot.docs[0])
  const accountRef = role.account
  const accountSnapshot = await getDoc(accountRef)
  const account = docSnapshotToObject(accountSnapshot)

  return account
}
