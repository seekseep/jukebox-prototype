import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'

import { app } from '../../firebase'

import { docSnapshotToData } from './utils'

export async function getCollection (path) {
  const firetore = getFirestore(app)
  const reference = collection(firetore, path)
  const { docs } = await getDocs(reference)
  const models = docs.map(doc => docSnapshotToData(doc))
  return models
}

export async function getDocument (path)  {
  const firetore = getFirestore(app)
  const reference = doc(firetore, path)
  const snapshot = await getDoc(reference)
  const model = docSnapshotToData(snapshot)

  return model
}
