export function docToPdfBlob (doc) {
  const blob = new Blob([
    doc.output('blob')
  ], {
    type: 'application/pdf'
  })
  return blob
}

export function createPdfFile (name, doc) {
  return {
    name: name,
    data: docToPdfBlob(doc)
  }
}
