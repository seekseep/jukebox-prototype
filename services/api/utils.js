import { getDoc, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore'

export function docSnapshotToObject (docSnapshot){
  const data = {
    id: docSnapshot.id,
  }

  Object.entries(docSnapshot.data()).forEach(([key, value]) => {
    if (value instanceof Timestamp) {
      data[key] = value.toDate()
      return
    }

    data[key] = value
  })

  return data
}

export function querySnapshotToRefs(querySnapshot) {
  return querySnapshot.docs.map(doc => doc.ref)
}

export function docsSnapshotToObjects (docsSnapshot, converter = docSnapshotToObject) {
  const objects = []
  for(let docSnapshot of docsSnapshot.docs) {
    objects.push(converter(docSnapshot))
  }
  return objects
}

export async function createResource (collectionRef, data) {
  const createdRef = await addDoc(collectionRef, data)
  const snapshot = await getDoc(createdRef)
  const created = docSnapshotToObject(snapshot)
  return created
}

export async function updateResource (docRef, data, { marge = true } = {}) {
  await updateDoc(docRef, data, { marge })
  const snapshot = await getDoc(docRef)
  const updated = docSnapshotToObject(snapshot)
  return updated
}

export async function deleteResource (docRef) {
  await deleteDoc(docRef)
  return null
}
