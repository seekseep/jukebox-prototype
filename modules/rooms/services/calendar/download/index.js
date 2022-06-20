import { jsPDF } from 'jspdf'
import { format } from 'date-fns'
import { createPdfFile } from '@rooms/services/pdf'
import { zipFiles } from '@rooms/services/zip'

export function getNewDoc () {
  const doc = new jsPDF()
  doc.addFont('/fonts/MPLUS1p-Regular.ttf', 'MPLUS1p', '')
  doc.addFont('/fonts/MPLUS1p-Bold.ttf', 'MPLUS1p', 'bold')
  doc.setFont('MPLUS1p', '')
  return doc
}

function setContentToDoc(doc, { format: _format, term, startedAt }) {
  doc.text(`Format: ${_format}`, 10, 20, { maxWidth: 100 })
  doc.text(`Term: ${term}`, 10, 30, { maxWidth: 100 })
  doc.text(`Started At: ${format(startedAt, 'yyyy-MM-dd HH:ss')}`, 10, 40, { maxWidth: 100 })
}


export async function downloadRoomCalendars(
  roomId,
  {
    format,
    term,
    startedAt,
    asOneFile
  },
  {
    lessons, students, teachers, sheets, relations, schedules
  }
) {
  const options = { format, term, startedAt, asOneFile }
  const resources = { roomId, lessons, teachers, students, sheets, relations, schedules }

  if (asOneFile) {
    const doc = getNewDoc()
    setContentToDoc(doc, options, resources)
    const { data, name } = createPdfFile('教室のカレンダー.pdf', doc)
    saveAs(data, name)
    return
  }

  const pdfFiles = [

  ]
  const doc = getNewDoc()
  setContentToDoc(doc, options, resources)
  pdfFiles.push(
    createPdfFile(
      '教室のカレンダー.pdf',
      doc
    )
  )

  const data = await zipFiles(pdfFiles)
  saveAs(data, '教室のカレンダー.zip')
}
