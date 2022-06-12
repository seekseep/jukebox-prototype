import { format } from 'date-fns'
import { useMemo } from 'react'
import locale from 'date-fns/locale/ja'

import { getTeacherDayLessonsSets } from '@rooms/services/lessons'

import { CalendarProvider, useGridStyle, usePlacedLesssons, useCalendarContext, useHours } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow, Row, HeadCol, HoursBodyRow, LessonsContainer, Lesson } from '@rooms/components/parts/calendar'

const TEACHER_NAME_COL_WIDTH = 10
const DAY_NAME_COL_WIDTH = 2
const HEAD_COL_WIDTH = TEACHER_NAME_COL_WIDTH + DAY_NAME_COL_WIDTH

function DayLessons({ dayLessons: { date, lessons } }) {
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
        <div className="text-sm">
          {format(date, 'EEE', { locale })}
        </div>
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

function TeacherDayLessons ({ teacherDayLessonsSet: { teacher, days: dayLessonsSets } }) {
  const headColStyle = useGridStyle({
    width: TEACHER_NAME_COL_WIDTH
  })
  return (
    <Row>
      <HeadCol style={headColStyle} className="sticky top-0 left-0 flex items-center justify-center text-sm">
        <div className="p-2 sticky top-4">{teacher.name}</div>
      </HeadCol>
      <div>
        {dayLessonsSets.map((dayLessonsSet) => (
          <DayLessons key={dayLessonsSet.date} dayLessons={dayLessonsSet} />
        ))}
      </div>
    </Row>
  )
}

export function Calendar ({ startedAt, lessons, teachers, }) {
  const { days } = useCalendarContext()
  const teacherDayLessonsSets = useMemo(() => getTeacherDayLessonsSets (lessons, { days, startedAt, teachers }), [days, lessons, startedAt, teachers])

  return (
    <CalendarContainer>
      <HoursHeadRow/>
      {teacherDayLessonsSets.map(teacherDayLessonsSet => (
        <TeacherDayLessons key={teacherDayLessonsSet.teacher.id} teacherDayLessonsSet={teacherDayLessonsSet} />
      ))}
    </CalendarContainer>
  )
}

export default function WeeklyLessonsCalendarByTeacher({ roomId, startedAt, lessons, teachers, startHour, endHour, days }) {
  return (
    <CalendarProvider roomId={roomId} startHour={startHour} endHour={endHour} days={days} headColWidth={HEAD_COL_WIDTH}>
      <Calendar startedAt={startedAt} lessons={lessons} teachers={teachers} />
    </CalendarProvider>
  )
}
