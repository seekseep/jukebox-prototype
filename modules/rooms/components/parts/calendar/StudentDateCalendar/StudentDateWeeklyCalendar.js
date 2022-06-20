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
    student,
    days
  } = useCalendarContext()

  const studentDateLessonsSets = useMemo(() =>
    getStudentWeekDayLessonsSets(lessons, {
      students: student ? [students.find(t => t.id === student)] : students,
      startedAt,
      days
    })
  , [days, lessons, startedAt, student, students])

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
