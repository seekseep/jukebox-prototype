import { useRouter } from 'next/router'

import { CALENDAR_FORMAT, CALENDAR_TERM } from '@rooms/constants'

import { MultiSuspension } from '@/components/parts/Suspension'

import { useCalendar } from '@rooms/hooks/lessons/calendar'
import { useSearchLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'

import WeeklyLessonsCalendarByTeacherForPrint from '@rooms/components/parts/lessons/WeeklyLessonsCalendarByTeacherForPrint'
import WeeklyLessonsCalendarByDayForPrint from '@rooms/components/parts/lessons/WeeklyLessonsCalendarByDayForPrint'
import DailyLessonsCalendarForPrint from '@rooms/components/parts/lessons/DailyLessonsCalendarForPrint'


export default function PrintLessons () {
  const { query } = useRouter()

  const { parsedQuery } = useCalendar(query)
  const { term, format } = parsedQuery
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
        <>
          {term === CALENDAR_TERM.WEEKLY && format === CALENDAR_FORMAT.TEACHER && (
            <WeeklyLessonsCalendarByTeacherForPrint {...{ startedAt: new Date(parsedQuery.startedAt), lessons, subjects, teachers, students, sheets }} />
          )}
          {term === CALENDAR_TERM.WEEKLY && format === CALENDAR_FORMAT.DAY && (
            <WeeklyLessonsCalendarByDayForPrint {...{ startedAt: new Date(parsedQuery.startedAt), lessons, subjects, teachers, students, sheets }} />
          )}
          {term === CALENDAR_TERM.DAILY && (
            <DailyLessonsCalendarForPrint {...{ startedAt: new Date(parsedQuery.startedAt), lessons, subjects, teachers, students, sheets }} />
          )}
        </>
      )}
    </MultiSuspension>
  )
}
