import { collection, doc, where, query, getDocs } from 'firebase/firestore'

import { ACCOUNT_TYPE } from '@/constatnts'
import { firestore } from '@/firebase'
import { createResource, deleteResource, updateResource, querySnapshotToRefs, docSnapshotToObject } from '@/services/api/utils'

export function getAccountsRef (roomId) {
  return collection(firestore, `/rooms/${roomId}/accounts`)
}

export function getAccountRef (roomId, accountId) {
  return doc(getAccountsRef(roomId), accountId)
}

export async function getAccountsByAccountType(roomId, accountType) {
  const accountsQuery = query(getAccountsRef(roomId), where('type', '==', accountType))
  const querySnapshot = await getDocs(accountsQuery)
  return querySnapshot.docs.map(doc => docSnapshotToObject(doc))
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

export async function deleteAccount (roomId, accountId) {
  const accountRef = getAccountRef(roomId, accountId)
  return await deleteResource(accountRef)
}
