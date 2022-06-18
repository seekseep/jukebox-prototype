import { saveAs } from 'file-saver'
import { format } from 'date-fns'

import { createPdfFile } from '@rooms/services/pdf'
import { zipFiles } from '@rooms/services/zip'
import { getNewDoc } from '@rooms/services/calendar/download'

function setContentToDoc(doc, teacherId, { term, startedAt }, { teachers }) {
  const teacher = teachers.find(teacher => teacher.id === teacherId)
  const title = `講師: ${teacher.name}${teacher.nameKana ? ` (${teacher.nameKana})` : ''}`
  doc.text(title, 10, 10, { maxWidth: 100 })
  doc.text(`Term: ${term}`, 10, 20, { maxWidth: 100 })
  doc.text(`Started At: ${format(startedAt, 'yyyy-MM-dd HH:ss')}`, 10, 30, { maxWidth: 100 })
}

export async function downloadTeacherCalendars(
  roomId,
  teacherIds,
  {
    term,
    startedAt,
    asOneFile = false
  },
  {
    lessons, teachers, students, sheets, relations, schedules
  }
) {
  const options = { term, startedAt, asOneFile }
  const resources = { roomId, lessons, teachers, students, sheets, relations, schedules }

  if (asOneFile) {
    const doc = getNewDoc()
    for (let index in teacherIds) {
      const teacherId = teacherIds[index]
      if (index > 0) doc.addPage()
      setContentToDoc(doc, teacherId, options, resources)
    }

    const { data, name } = createPdfFile('講師のカレンダー.pdf', doc)
    saveAs(data, name)
    return
  }

  const pdfFiles = []
  for (let index in teacherIds) {
    const teacherId = teacherIds[index]
    const teacher = teachers.find(teacher => teacher.id === teacherId)
    const doc = getNewDoc()
    setContentToDoc(doc, teacherId, options, resources)
    pdfFiles.push(
      createPdfFile(
        `講師カレンダー - ${teacher.name}.pdf`,
        doc
      )
    )
  }

  const data = await zipFiles(pdfFiles)
  saveAs(data, '講師のカレンダー.zip')
}

export async function downloadTeacherCalendar (
  roomId,
  teacherId,
  {
    term,
    startedAt,
  },
  {
    lessons, teachers, students, sheets, relations, schedules
  }
) {
  const options = { term, startedAt }
  const resources = { roomId, lessons, teachers, students, sheets, relations, schedules }
  const doc = getNewDoc()
  const teacher = teachers.find(teacher => teacher.id === teacherId)
  setContentToDoc(doc, teacherId, options, resources)
  const { data, name } = createPdfFile(`講師カレンダー - ${teacher.name}.pdf`, doc)
  saveAs(data, name)
}
