export function docToData (doc){
  return {
    id: doc.id,
    ...doc.data()
  }
}

export async function collectionToModels (collectionReference) {
  const { docs } = await getDocs(collectionReference)
  return docs.map(doc => docToData(doc))
}

export function snapshotToModels (snapshot, converter = docToData) {
  const models = []
  snapshot.forEach(doc => models.push(converter(doc)))
  return models
}
