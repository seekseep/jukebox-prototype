import { useMemo } from 'react'

import { getTeacherWeekDayLessonsSets } from '@rooms/services/lessons'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow } from '@rooms/components/parts/calendar/horizontal'

import TeacherDateLessonsRow from '@rooms/components/parts/calendar/TeacherDateCalendar/TeacherDateLessonsRow'

export default function TeacherDateWeeklyCalendar() {
  const {
    lessons,
    teachers,
    startedAt,
    days
  } = useCalendarContext()

  const teacherDateLessonsSets = useMemo(() =>
    getTeacherWeekDayLessonsSets(lessons, {
      teachers,
      startedAt,
      days
    })
  , [days, lessons, startedAt, teachers])

  return (
    <CalendarContainer>
      <HoursHeadRow/>
      {teacherDateLessonsSets.map(teacherDateLessonsSet => (
        <TeacherDateLessonsRow
          key={teacherDateLessonsSet.teacher.id}
          teacherDateLessonsSet={teacherDateLessonsSet} />
      ))}

    </CalendarContainer>
  )
}
