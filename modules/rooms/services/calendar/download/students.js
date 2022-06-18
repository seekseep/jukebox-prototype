import { jsPDF } from 'jspdf'
import { saveAs } from 'file-saver'
import { format } from 'date-fns'

import { createPdfFile } from '@rooms/services/pdf'
import { zipFiles } from '@rooms/services/zip'

function getNewDoc () {
  const doc = new jsPDF()
  doc.addFont('/fonts/MPLUS1p-Regular.ttf', 'MPLUS1p', '')
  doc.addFont('/fonts/MPLUS1p-Bold.ttf', 'MPLUS1p', 'bold')
  doc.setFont('MPLUS1p', '')
  return doc
}

function setContentToDoc(doc, studentId, { term, startedAt }, { students }) {
  const student = students.find(student => student.id === studentId)
  const title = `生徒: ${student.name}${student.nameKana ? ` (${student.nameKana})` : ''}`
  doc.text(title, 10, 10, { maxWidth: 100 })
  doc.text(`Term: ${term}`, 10, 20, { maxWidth: 100 })
  doc.text(`Started At: ${format(startedAt, 'yyyy-MM-dd HH:ss')}`, 10, 30, { maxWidth: 100 })
}

export async function downloadStudentCalendars(
  roomId,
  studentIds,
  {
    term,
    startedAt,
    asOneFile = false
  },
  {
    lessons, students, teachers, sheets, relations, schedules
  }
) {
  const options = { term, startedAt, asOneFile }
  const resources = { roomId, lessons, students, teachers, sheets, relations, schedules }

  if (asOneFile) {
    const doc = getNewDoc()
    for (let index in studentIds) {
      const studentId = studentIds[index]
      if (index > 0) doc.addPage()
      setContentToDoc(doc, studentId, options, resources)
    }

    const { data, name } = createPdfFile('生徒のカレンダー.pdf', doc)
    saveAs(data, name)
    return
  }

  const pdfFiles = []
  for (let index in studentIds) {
    const studentId = studentIds[index]
    const student = students.find(student => student.id === studentId)
    const doc = getNewDoc()
    setContentToDoc(doc, studentId, options, resources)
    pdfFiles.push(
      createPdfFile(
        `生徒カレンダー - ${student.name}.pdf`,
        doc
      )
    )
  }

  const data = await zipFiles(pdfFiles)
  saveAs(data, '生徒のカレンダー.zip')
}

export async function downloadStudentCalendar (
  roomId,
  studentId,
  {
    term,
    startedAt,
  },
  {
    lessons, students, teachers, sheets, relations, schedules
  }
) {
  const options = { term, startedAt }
  const resources = { roomId, lessons, students, teachers, sheets, relations, schedules }
  const doc = getNewDoc()
  const student = students.find(student => student.id === studentId)
  setContentToDoc(doc, studentId, options, resources)
  const { data, name } = createPdfFile(`生徒カレンダー - ${student.name}.pdf`, doc)
  saveAs(data, name)
}
