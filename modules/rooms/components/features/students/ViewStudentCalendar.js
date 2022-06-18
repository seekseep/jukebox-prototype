import { useRouter } from 'next/router'

import { Feature, FeatureHead, FeatureTitle } from '@/components/parts/feature'
import { MultiSuspension } from '@/components/parts/Suspension'
import Card from '@/components/parts/Card'

import { useCalendar } from '@rooms/hooks/lessons/calendar'
import { useSearchLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'

import StudentCalendar from '@rooms/components/parts/calendar/StudentCalendar'
import StudentCalendarNavigation from '@rooms/components/parts/calendar/StudentCalendarNavigation'
import { CALENDAR_FORMAT } from '@rooms/constants'
import { useToggleState } from '@/hooks/ui'
import DownloadStudentCalendarModal from '@rooms/components/parts/students/DownloadStudentCalendarModal'

import { useDownlaodStudentCalendar } from '@rooms/hooks/students'
import { useRelationsQuery } from '@rooms/hooks/relations'
import { useSchedulesQuery } from '@rooms/hooks/schedules'

export default function ViewStudeCalendar () {
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
  } = useCalendar(router, {
    format : CALENDAR_FORMAT.STUDENT_DATE,
    student: router.query.studentId,
  })

  const lessonsQueryResult = useSearchLessonsQuery(parsedQuery.roomId, parsedQuery)
  const subjectsQueryResult = useSubjectsQuery(parsedQuery.roomId)
  const teachersQueryResult = useTeachersQuery(parsedQuery.roomId)
  const studentsQueryResult = useStudentsQuery(parsedQuery.roomId)
  const sheetsQueryResult = useSheetsQuery(parsedQuery.roomId)
  const relationsQueryResult = useRelationsQuery(parsedQuery.roomId)
  const schedulesQueryResult = useSchedulesQuery(parsedQuery.roomId)

  const [downloadCalendar, downloadResult] = useDownlaodStudentCalendar(parsedQuery.roomId, {
    teachers : teachersQueryResult.data,
    students : studentsQueryResult.data,
    relations: relationsQueryResult.data,
    schedules: schedulesQueryResult.data,
    lessons  : lessonsQueryResult.data,
    subjects : subjectsQueryResult.data,
  })

  if (!parsedQuery.roomId) return null

  return (
    <Feature>
      <FeatureHead>
        <FeatureTitle>カレンダー</FeatureTitle>
      </FeatureHead>
      <MultiSuspension results={[
        lessonsQueryResult,
        subjectsQueryResult,
        teachersQueryResult,
        studentsQueryResult,
        sheetsQueryResult,
        relationsQueryResult,
        schedulesQueryResult
      ]}>
        {({ data: [lessons, subjects, teachers, students, sheets] }) =>
          <>
            <Card>
              {parsedQuery && (
                <StudentCalendarNavigation
                  current={currentLabel}
                  query={parsedQuery}
                  onGoToday={handleGoToday}
                  onGoPrevious={handleGoPrevious}
                  onGoNext={handleGoNext}
                  onDownload={toggleDownloadModal}
                  onChangeQuery={queryDiff => refresh(getChangedQuery(queryDiff))}
                />
              )}
              <StudentCalendar
                {...{
                  lessons,
                  subjects,
                  teachers,
                  students,
                  sheets,
                  ...parsedQuery,
                }} />
            </Card>
            <DownloadStudentCalendarModal
              studentId={router.query.studentId}
              isOpened={isDownloadModalOpened}
              toggle={toggleDownloadModal}
              onSubmit={downloadCalendar}
              {...downloadResult} />
          </>
        }
      </MultiSuspension>
    </Feature>
  )
}
