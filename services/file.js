export const CONTENT_TYPE = {
  CSV: 'text/csv'
}

export function csvToDataUrl (csvString) {
  return dataToDataUrl(CONTENT_TYPE.CSV, csvString)
}

export function dataToDataUrl (mediaType, data, isBase64 = false) {
  if (isBase64) {
    return `data:${mediaType};base64,${data}`
  }
  return `data:${mediaType},${data}`
}
