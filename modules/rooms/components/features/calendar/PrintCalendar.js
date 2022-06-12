import { useRouter } from 'next/router'

import { MultiSuspension } from '@/components/parts/Suspension'

import { useCalendar } from '@rooms/hooks/lessons/calendar'
import { useSearchLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'

import CalendarForPrint from '@rooms/components/parts/calendar/print/CalendarForPrint'

export default function PrintCalendar () {
  const { query } = useRouter()

  const { parsedQuery, startedAt } = useCalendar(query)
  const { roomId, term, format, startHour, endHour } = parsedQuery
  const lessonsQueryResult = useSearchLessonsQuery(query.roomId, parsedQuery)
  const subjectsQueryResult = useSubjectsQuery(query.roomId)
  const teachersQueryResult = useTeachersQuery(query.roomId)
  const studentsQueryResult = useStudentsQuery(query.roomId)
  const sheetsQueryResult = useSheetsQuery(query.roomId)

  return (
    <MultiSuspension results={[
      lessonsQueryResult,
      subjectsQueryResult,
      teachersQueryResult,
      studentsQueryResult,
      sheetsQueryResult
    ]}>
      {({ data: [lessons, subjects, teachers, students, sheets] }) => (
        <CalendarForPrint
          {...{
            startedAt,
            roomId,
            lessons,
            subjects,
            teachers,
            students,
            sheets,
            format,
            term,
            startHour,
            endHour
          }} />
      )}
    </MultiSuspension>
  )
}
