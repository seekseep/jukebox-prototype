import { useRouter } from 'next/router'
import { MultiSuspension } from '@/components/parts/Suspension'

import { useToggleState } from '@/hooks/ui'

import { useCalendar, useDownlaodCalendars } from '@rooms/hooks/lessons/calendar'
import { useSearchLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'
import { useRelationsQuery } from '@rooms/hooks/relations'
import { useSchedulesQuery } from '@rooms/hooks/schedules'

import RoomCalendarNavigation from '@rooms/components/parts/calendar/RoomCalendarNavigation'
import RoomCalendar from '@rooms/components/parts/calendar/RoomCalendar'
import DownloadCalendarsModal from '@rooms/components/parts/calendar/DownloadCalendarsModal'

export default function ViewCalendar () {
  const router = useRouter()
  const [isDownloadModalOpened, toggleDownloadModal] = useToggleState(false)

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
  const relationsQueryResult = useRelationsQuery(parsedQuery.roomId)
  const schedulesQueryResult = useSchedulesQuery(parsedQuery.roomId)

  const [downloadCalendar, downloadResult] = useDownlaodCalendars(parsedQuery.roomId, {
    teachers : teachersQueryResult.data,
    students : studentsQueryResult.data,
    relations: relationsQueryResult.data,
    schedules: schedulesQueryResult.data,
    lessons  : lessonsQueryResult.data,
    subjects : subjectsQueryResult.data,
  })

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
              onDownload={toggleDownloadModal}
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
            <DownloadCalendarsModal
              isOpened={isDownloadModalOpened} toggle={toggleDownloadModal}
              onSubmit={downloadCalendar}
              {...downloadResult} />
          </>
        }
      </MultiSuspension>
    </div>
  )
}
