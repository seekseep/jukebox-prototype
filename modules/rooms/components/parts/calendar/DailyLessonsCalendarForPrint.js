import { format } from 'date-fns'
import { useMemo } from 'react'
import locale from 'date-fns/locale/ja'

import { getDayTeacherLessonsSet } from '@rooms/services/lessons'

import { CalendarProvider, useCalendarContext, useGridStyle, usePlacedLesssons } from '@rooms/components/parts/calendar/hooks'
import { PrintPage, HoursHeadRow, HoursBodyRow, Row, Col, LessonsContainer, Lesson, PageHeader, PageSection, PageBody } from '@rooms/components/parts/calendar/print'

const TEACHER_NAME_COL_WIDTH = 8
const DAY_NAME_COL_WIDTH = 8
const HEAD_COL_WIDTH = TEACHER_NAME_COL_WIDTH + DAY_NAME_COL_WIDTH

function TeacherLessons({ teacherLessonsSet: { teacher, lessons } }) {
  const placedLessons = usePlacedLesssons(lessons)

  const dayColStyle = useGridStyle({
    width: DAY_NAME_COL_WIDTH,
    left : TEACHER_NAME_COL_WIDTH,
  })

  return (
    <Row>
      <Col style={dayColStyle} className="text-center sticky flex items-center justify-center border-b border-r">
        <div className="text-xs">
          {teacher.name}
        </div>
      </Col>
      <Col className="grow">
        <HoursBodyRow />
        <LessonsContainer>
          {placedLessons.map(({ lesson, placement }) =>
            <Lesson key={lesson.id} lesson={lesson} placement={placement} />
          )}
        </LessonsContainer>
      </Col>
    </Row>
  )
}

function DayTeacherLessons ({ dayTeacherLessonsSet: { date, teachers: teacherLessonsSets } }) {
  const headColStyle = useGridStyle({
    width: TEACHER_NAME_COL_WIDTH
  })
  return (
    <Row className="grow w-full h-full items-stretch">
      <Col style={headColStyle} className="flex flex-col items-center justify-center border-r border-b">
        <div className="text-sm">
          {format(date, 'MM月dd日 EE', { locale })}
        </div>
      </Col>
      <div className="grow grid grid-cols-1">
        {teacherLessonsSets.map((teacherLessonsSet) => (
            <TeacherLessons teacherLessonsSet={teacherLessonsSet} key={teacherLessonsSet.teacher.id} />
        ))}
      </div>
    </Row>
  )
}

export function Calendar ({ startedAt, lessons, teachers, }) {
  const { days } = useCalendarContext()
  const dayTeacherLessonsSet = useMemo(() => getDayTeacherLessonsSet(lessons, { startedAt, teachers, days }), [days, lessons, startedAt, teachers])

  return (
    <PrintPage>
      <PageHeader title="印刷タイトル" />
      <HoursHeadRow />
      <PageBody>
        <PageSection sectionPerPage={1}>
          <DayTeacherLessons
            dayTeacherLessonsSet={dayTeacherLessonsSet} />
        </PageSection>
      </PageBody>
    </PrintPage>
  )
}

export default function WeeklyLessonsCalendarByDay({ roomId, startedAt, lessons, teachers, startHour, endHour, days }) {
  return (
    <CalendarProvider roomId={roomId} startHour={startHour} endHour={endHour} days={days} headColWidth={HEAD_COL_WIDTH}>
      <Calendar startedAt={startedAt} lessons={lessons} teachers={teachers} />
    </CalendarProvider>
  )
}
