import { useMemo } from 'react'

import { getStudentDateLessonsSets } from '@rooms/services/lessons'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow } from '@rooms/components/parts/calendar/horizontal'

import StudentDateLessonsRow from '@rooms/components/parts/calendar/StudentDateCalendar/StudentDateLessonsRow'

export default function StudentDateDailyCalendar() {
  const {
    lessons,
    students,
    startedAt
  } = useCalendarContext()

  const studentDateLessonsSets = useMemo(() =>
    getStudentDateLessonsSets(lessons, {
      students,
      date: startedAt
    })
  , [lessons, startedAt, students])

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
