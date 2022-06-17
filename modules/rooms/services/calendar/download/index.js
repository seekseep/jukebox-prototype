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
