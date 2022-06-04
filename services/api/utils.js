import { getDoc, addDoc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore'

function sanitizeData (data) {
  const sanitaized = {}

  for (let key in data) {
    if (typeof data[key] === 'undefined') continue
    sanitaized[key] = data[key]
  }

  return sanitaized
}

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

export function querySnapshotToObjects (querySnapshot, converter = docSnapshotToObject) {
  const objects = []
  for(let docSnapshot of querySnapshot.docs) {
    objects.push(converter(docSnapshot))
  }
  return objects
}

export async function createResource (collectionRef, data) {
  const createdRef = await addDoc(collectionRef, sanitizeData(data))
  const snapshot = await getDoc(createdRef)
  const created = docSnapshotToObject(snapshot)
  return created
}

export async function updateResource (docRef, data, { marge = true } = {}) {
  await updateDoc(docRef, sanitizeData(data), { marge })
  const snapshot = await getDoc(docRef)
  const updated = docSnapshotToObject(snapshot)
  return updated
}

export async function deleteResource (docRef) {
  await deleteDoc(docRef)
  return null
}
