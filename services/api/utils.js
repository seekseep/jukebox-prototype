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
