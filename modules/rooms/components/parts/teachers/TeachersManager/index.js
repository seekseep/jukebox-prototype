import { useState } from 'react'

import TeachersTable  from '@rooms/components/parts/teachers/TeachersTable'
import EditTeachersModal  from '@rooms/components/parts/teachers/EditTeachersModal'
import DownloadTeacherCalendarsModal  from '@rooms/components/parts/teachers/DownloadTeacherCalendarsModal'

export default function TeachersManager({
  roomId, teachers,
  onDeleteTeachers,
  onUpdateTeachers,
  updateResult,
  onDownloadTeachersCalendars,
  downloadResult
}){
  const [toEditTeachers, setToEditTeachers] = useState(null)
  const [toDownloadCalendarsTeachers, setToDownloadCalendarsTeachers] = useState(null)

  return (
    <>
      <TeachersTable
        roomId={roomId} teachers={teachers}
        onDownloadCalendars={teachers => setToDownloadCalendarsTeachers(teachers)}
        onEdit={teachers => setToEditTeachers(teachers)}
        onDelete={teachers => onDeleteTeachers({ teachers })} />
      <EditTeachersModal
        isOpened={!!toEditTeachers} toggle={() => setToEditTeachers(null)}
        teachers={toEditTeachers} allTeachers={teachers}
        onSubmit={({ teachers }) => onUpdateTeachers({ teachers })}
        {...updateResult} />
      <DownloadTeacherCalendarsModal
        isOpened={!!toDownloadCalendarsTeachers} toggle={() => setToDownloadCalendarsTeachers(null)}
        teachers={toDownloadCalendarsTeachers}
        onSubmit={({ teacherIds, options }) => onDownloadTeachersCalendars({ teacherIds, options })}
        {...downloadResult} />
    </>
  )
}
