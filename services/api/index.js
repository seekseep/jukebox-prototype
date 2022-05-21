import { collection, doc, getDoc, getDocs, } from 'firebase/firestore'

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
