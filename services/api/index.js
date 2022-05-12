import { collection, doc, getDoc, getDocs, } from 'firebase/firestore'

import { firestore } from '../../firebase'

import { docSnapshotToData } from './utils'

export async function getCollection (path) {
  const reference = collection(firestore, path)
  const { docs } = await getDocs(reference)
  const models = docs.map(doc => docSnapshotToData(doc))
  return models
}

export async function getDocument (path)  {
  const reference = doc(firestore, path)
  const snapshot = await getDoc(reference)
  const model = docSnapshotToData(snapshot)

  return model
}
