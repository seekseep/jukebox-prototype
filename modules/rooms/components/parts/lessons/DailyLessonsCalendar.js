import { format } from 'date-fns'
import { useMemo } from 'react'
import locale from 'date-fns/locale/ja'

import { getDayTeacherLessonsSet } from '@rooms/services/lessons'

import { CalendarProvider, useGridStyle, usePlacedLesssons, useCalendarContext, useHours } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow, Row, HeadCol, HoursBodyRow, LessonsContainer, Lesson } from '@rooms/components/parts/calendar'

const DAY_NAME_COL_WIDTH = 8
const TEACHER_NAME_COL_WIDTH = 10
const HEAD_COL_WIDTH = TEACHER_NAME_COL_WIDTH + DAY_NAME_COL_WIDTH

function TeacherLessons({ teacherLessonsSet: { teacher, lessons } }) {
  const {
    lessonRowHeight,
    lessonRowsCount,
    hourColWidth
  } =  useCalendarContext()
  const hours = useHours()

  const placedLessons = usePlacedLesssons(lessons)

  const dayColStyle = useGridStyle({
    width: DAY_NAME_COL_WIDTH,
    left : TEACHER_NAME_COL_WIDTH,
  })

  const lessonRowStyle = useGridStyle({
    height: lessonRowHeight * lessonRowsCount,
    width : hours.length * hourColWidth,
  })

  return (
    <Row>
      <HeadCol style={dayColStyle} className="text-center sticky flex items-center justify-center">
        <div>{teacher.name}</div>
      </HeadCol>
      <Row style={lessonRowStyle}>
        <HoursBodyRow />
        <LessonsContainer>
          {placedLessons.map(({ lesson, placement }) =>
            <Lesson key={lesson.id} lesson={lesson} placement={placement} />
          )}
        </LessonsContainer>
      </Row>
    </Row>
  )
}

function DayTeacherLessons ({ dayTeacherLessonsSet: { date, teachers } }) {
  const headColStyle = useGridStyle({
    width: TEACHER_NAME_COL_WIDTH
  })

  return (
    <Row>
      <HeadCol style={headColStyle} className="sticky top-0 left-0 flex items-center justify-center">
        <div className="p-2 sticky top-0">
          {format(date, 'MM月dd日 EE', { locale })}
        </div>
      </HeadCol>
      <div>
        {teachers.map((teacherLessonsSet) => (
          <TeacherLessons key={teacherLessonsSet.teacher.id} teacherLessonsSet={teacherLessonsSet} />
        ))}
      </div>
    </Row>
  )
}

export function Calendar ({ lessons, teachers, startedAt }) {
  const dayTeacherLessonsSet = useMemo(() => getDayTeacherLessonsSet(lessons, { teachers, startedAt }), [lessons, startedAt, teachers])

  return (
    <CalendarContainer>
      <HoursHeadRow/>
      <DayTeacherLessons
        key={dayTeacherLessonsSet.date}
        dayTeacherLessonsSet={dayTeacherLessonsSet} />
    </CalendarContainer>
  )
}

export default function DailyLessonsCalendar({ roomId, startedAt, lessons, teachers, startHour, endHour, days }) {
  return (
    <CalendarProvider roomId={roomId} startHour={startHour} endHour={endHour} days={days} headColWidth={HEAD_COL_WIDTH}>
      <Calendar startedAt={startedAt} lessons={lessons} teachers={teachers} />
    </CalendarProvider>
  )
}
