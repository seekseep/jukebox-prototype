import { collection, doc, getDoc, getDocs, addDoc, updateDoc as fsUpdateDoc, deleteDoc as fsDeleteDoc } from 'firebase/firestore'

import { firestore } from '@/firebase'

import { docSnapshotToObject, querySnapshotToRefs } from './utils'


export async function getCollectioDocRefs (path) {
  const reference = collection(firestore, path)
  const querySnapshot = await getDocs(reference)
  return querySnapshotToRefs(querySnapshot)
}

export async function getCollectionAsObjectArray (path)  {
  const reference = collection(firestore, path)
  const querySnapshot = await getDocs(reference)
  return querySnapshot.docs.map(doc => docSnapshotToObject(doc))
}

export async function getDocAsObject (path)  {
  const reference = doc(firestore, path)
  const snapshot = await getDoc(reference)
  const object = docSnapshotToObject(snapshot)
  return object
}

export async function createDoc (path, data) {
  const reference = collection(firestore, path)
  const createdRef = await addDoc(reference, data)
  const snapshot = await getDoc(createdRef)
  const created = docSnapshotToObject(snapshot)
  return created
}

export async function updateDoc (path, data) {
  const reference = doc(firestore, path)
  await fsUpdateDoc(reference, data)
  const snapshot = await getDoc(reference)
  const updated = docSnapshotToObject(snapshot)
  return updated
}

export async function deleteDoc (path) {
  const reference = doc(firestore, path)
  await fsDeleteDoc(reference)
  return null
}
