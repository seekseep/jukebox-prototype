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
import { useRelationsQuery } from '@rooms/hooks/relations'
import { useSchedulesQuery } from '@rooms/hooks/schedules'
import { useDownlaodTeacherCalendar } from '@rooms/hooks/teachers'

import TeacherCalendar from '@rooms/components/parts/calendar/TeacherCalendar'
import TeacherCalendarNavigation from '@rooms/components/parts/calendar/TeacherCalendarNavigation'
import { CALENDAR_FORMAT } from '@rooms/constants'
import { useToggleState } from '@/hooks/ui'
import DownloadTeacherCalendarModal from '@rooms/components/parts/teachers/DownloadTeacherCalendarModal'

export default function ViewTeacherCalendar () {
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
    format : CALENDAR_FORMAT.TEACHER_DATE,
    teacher: router.query.teacherId,
  })

  const lessonsQueryResult = useSearchLessonsQuery(parsedQuery.roomId, parsedQuery)
  const subjectsQueryResult = useSubjectsQuery(parsedQuery.roomId)
  const teachersQueryResult = useTeachersQuery(parsedQuery.roomId)
  const studentsQueryResult = useStudentsQuery(parsedQuery.roomId)
  const sheetsQueryResult = useSheetsQuery(parsedQuery.roomId)
  const relationsQueryResult = useRelationsQuery(parsedQuery.roomId)
  const schedulesQueryResult = useSchedulesQuery(parsedQuery.roomId)

  const [downloadCalendar, downloadResult] = useDownlaodTeacherCalendar(parsedQuery.roomId, {
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
        studentsQueryResult,
        teachersQueryResult,
        sheetsQueryResult,
        relationsQueryResult,
        schedulesQueryResult
      ]}>
        {({ data: [lessons, subjects, students, teachers, sheets] }) =>
          <>
            <Card>
              {parsedQuery && (
                <TeacherCalendarNavigation
                  current={currentLabel}
                  query={parsedQuery}
                  onGoToday={handleGoToday}
                  onGoPrevious={handleGoPrevious}
                  onGoNext={handleGoNext}
                  onDownload={toggleDownloadModal}
                  onChangeQuery={queryDiff => refresh(getChangedQuery(queryDiff))}
                />
              )}
              <TeacherCalendar
                {...{
                  lessons,
                  subjects,
                  students,
                  teachers,
                  sheets,
                  ...parsedQuery,
                }} />
            </Card>
            <DownloadTeacherCalendarModal
              teacherId={router.query.teacherId}
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
