import { useMemo } from 'react'

import { getStudentWeekDayLessonsSets } from '@rooms/services/lessons'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow } from '@rooms/components/parts/calendar/horizontal'

import StudentDateLessonsRow from '@rooms/components/parts/calendar/StudentDateCalendar/StudentDateLessonsRow'

export default function StudentDateWeeklyCalendar() {
  const {
    lessons,
    students,
    startedAt,
    days
  } = useCalendarContext()

  const studentDateLessonsSets = useMemo(() =>
    getStudentWeekDayLessonsSets(lessons, {
      students,
      startedAt,
      days
    })
  , [days, lessons, startedAt, students])

  return (
    <CalendarContainer>
      <HoursHeadRow/>
      {studentDateLessonsSets.map(studentDateLessonsSet => (
        <StudentDateLessonsRow
          key={studentDateLessonsSet.student.id}
          studentDateLessonsSet={studentDateLessonsSet} />
      ))}

    </CalendarContainer>
  )
}
