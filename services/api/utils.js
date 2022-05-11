import { getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

export function docSnapshotToData (doc){
  return {
    id: doc.id,
    ...doc.data()
  }
}

export function collectionSnapshotToDataArray (snapshot, converter = docSnapshotToData) {
  const dataArray = []
  snapshot.forEach(doc => dataArray.push(converter(doc)))
  return dataArray
}

export async function createResource (collectionRef, data) {
  const createdRef = await addDoc(collectionRef, data)
  const snapshot = await getDoc(createdRef)
  const created = docSnapshotToData(snapshot)
  return created
}

export async function updateResource (docRef, data, { marge = true } = {}) {
  await updateDoc(docRef, data, { marge })
  const snapshot = await getDoc(docRef)
  const updated = docSnapshotToData(snapshot)
  return updated
}

export async function deleteResource (docRef) {
  await deleteDoc(docRef)
  return null
}
