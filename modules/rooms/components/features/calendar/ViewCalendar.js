import { useRouter } from 'next/router'
import { MultiSuspension } from '@/components/parts/Suspension'

import { useCalendar } from '@rooms/hooks/lessons/calendar'
import { useSearchLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'

import RoomCalendarNavigation from '@rooms/components/parts/calendar/RoomCalendarNavigation'
import RoomCalendar from '@rooms/components/parts/calendar/RoomCalendar'

export default function ViewCalendar () {
  const router = useRouter()

  const {
    parsedQuery,
    currentLabel,
    getChangedQuery,
    refresh,
    handleGoToday,
    handleGoPrevious,
    handleGoNext,
  } = useCalendar(router)

  const lessonsQueryResult = useSearchLessonsQuery(parsedQuery.roomId, parsedQuery)
  const subjectsQueryResult = useSubjectsQuery(parsedQuery.roomId)
  const teachersQueryResult = useTeachersQuery(parsedQuery.roomId)
  const studentsQueryResult = useStudentsQuery(parsedQuery.roomId)
  const sheetsQueryResult = useSheetsQuery(parsedQuery.roomId)

  if (!parsedQuery.roomId) return null

  return (
    <div className="bg-white relative w-full h-full flex flex-col">
      <MultiSuspension results={[
        lessonsQueryResult,
        subjectsQueryResult,
        teachersQueryResult,
        studentsQueryResult,
        sheetsQueryResult
      ]}>
        {({ data: [lessons, subjects, teachers, students, sheets] }) =>
          <>
            <RoomCalendarNavigation
              current={currentLabel}
              query={parsedQuery}
              onGoToday={handleGoToday}
              onGoPrevious={handleGoPrevious}
              onGoNext={handleGoNext}
              onChangeQuery={queryDiff => refresh(getChangedQuery(queryDiff))}
              students={students}
              teachers={teachers}
            />
            <RoomCalendar
              {...{
                lessons,
                subjects,
                teachers,
                students,
                sheets,
                ...parsedQuery
              }} />
          </>
        }
      </MultiSuspension>
    </div>
  )
}
