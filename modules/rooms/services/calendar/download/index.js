import { jsPDF } from 'jspdf'

export function getNewDoc () {
  const doc = new jsPDF()
  doc.addFont('/fonts/MPLUS1p-Regular.ttf', 'MPLUS1p', '')
  doc.addFont('/fonts/MPLUS1p-Bold.ttf', 'MPLUS1p', 'bold')
  doc.setFont('MPLUS1p', '')
  return doc
}

export async function downloadTeacherCalendars(
  roomId,
  treacherIds,
  {
    term,
    startedAt,
    asOneFile
  },
  {
    lessons, students, teachers, sheets, relations, schedules
  }
) {
  const options = { term, startedAt, asOneFile }
  const resources = { lessons, students, teachers, sheets, relations, schedules }
  console.info('Download Teacher Calendars', {
    roomId,
    treacherIds,
    options,
    resources
  })

}

export async function downloadRoomCalendars(
  roomId,
  {
    term,
    startedAt,
    asOneFile
  },
  {
    lessons, students, teachers, sheets, relations, schedules
  }
) {
  const options = { term, startedAt, asOneFile }
  const resources = { lessons, students, teachers, sheets, relations, schedules }
  console.info('Download Room Calendars', {
    roomId,
    treacherIds,
    options,
    resources
  })
}
