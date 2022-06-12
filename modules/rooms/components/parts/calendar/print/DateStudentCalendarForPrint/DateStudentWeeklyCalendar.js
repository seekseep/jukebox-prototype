import { useMemo } from 'react'

import { getWeekDayStudentLessonsSets } from '@rooms/services/lessons'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow } from '@rooms/components/parts/calendar/horizontal'

import DateStudentLessonsRow from '@rooms/components/parts/calendar/DateStudentCalendar/DateStudentLessonsRow'

export default function DateStudentWeeklyCalendar() {
  const {
    lessons,
    students,
    startedAt,
    days
  } = useCalendarContext()

  const dateStudentLessonsSets = useMemo(() => {
    return getWeekDayStudentLessonsSets(lessons, {
      days,
      startedAt,
      students
    })
  }, [days, lessons, startedAt, students])

  return (
    <CalendarContainer>
      <HoursHeadRow/>
      {dateStudentLessonsSets.map(dateStudentLessonsSet => (
        <DateStudentLessonsRow
          key={dateStudentLessonsSet.date.getTime()}
          dateStudentLessonsSet={dateStudentLessonsSet} />
      ))}
    </CalendarContainer>
  )
}
