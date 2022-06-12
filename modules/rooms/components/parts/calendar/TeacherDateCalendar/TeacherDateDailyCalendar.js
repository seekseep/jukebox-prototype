import { useMemo } from 'react'

import { getTeacherDateLessonsSets } from '@rooms/services/lessons'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow } from '@rooms/components/parts/calendar/horizontal'

import TeacherDateLessonsRow from '@rooms/components/parts/calendar/TeacherDateCalendar/TeacherDateLessonsRow'

export default function TeacherDateDailyCalendar() {
  const {
    lessons,
    teachers,
    startedAt
  } = useCalendarContext()

  const teacherDateLessonsSets = useMemo(() =>
    getTeacherDateLessonsSets(lessons, {
      teachers,
      date: startedAt
    })
  , [lessons, startedAt, teachers])

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
