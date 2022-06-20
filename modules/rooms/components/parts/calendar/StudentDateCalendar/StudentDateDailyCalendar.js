import { useMemo } from 'react'

import { getStudentDateLessonsSets } from '@rooms/services/lessons'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow } from '@rooms/components/parts/calendar/horizontal'

import StudentDateLessonsRow from '@rooms/components/parts/calendar/StudentDateCalendar/StudentDateLessonsRow'

export default function StudentDateDailyCalendar() {
  const {
    lessons,
    students,
    startedAt,
    student
  } = useCalendarContext()

  const studentDateLessonsSets = useMemo(() =>
    getStudentDateLessonsSets(lessons, {
      students: student ? [students.find(t => t.id === student)] : students,
      date    : startedAt
    })
  , [lessons, startedAt, student, students])

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
