import { useState } from 'react'

import StudentsTable  from '@rooms/components/parts/students/StudentsTable'
import EditStudentsModal  from '@rooms/components/parts/students/EditStudentsModal'
import DownloadStudentCalendarsModal  from '@rooms/components/parts/students/DownloadStudentCalendarsModal'

export default function StudentsManager({
  roomId, students,
  onDeleteStudents,
  onUpdateStudents,
  updateResult,
  onDownloadStudentsCalendars,
  downloadResult
}){
  const [toEditStudents, setToEditStudents] = useState(null)
  const [toDownloadCalendarsStudents, setToDownloadCalendarsStudents] = useState(null)

  return (
    <>
      <StudentsTable
        roomId={roomId} students={students}
        onDownloadCalendars={students => setToDownloadCalendarsStudents(students)}
        onEdit={students => setToEditStudents(students)}
        onDelete={students => onDeleteStudents({ students })} />
      <EditStudentsModal
        isOpened={!!toEditStudents} toggle={() => setToEditStudents(null)}
        students={toEditStudents} allStudents={students}
        onSubmit={({ students }) => onUpdateStudents({ students })}
        {...updateResult} />
      <DownloadStudentCalendarsModal
        isOpened={!!toDownloadCalendarsStudents} toggle={() => setToDownloadCalendarsStudents(null)}
        students={toDownloadCalendarsStudents}
        onSubmit={({ studentIds, options }) => onDownloadStudentsCalendars({ studentIds, options })}
        {...downloadResult} />
    </>
  )
}
