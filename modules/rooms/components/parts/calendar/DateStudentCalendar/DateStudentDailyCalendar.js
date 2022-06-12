import { useMemo } from 'react'

import { getDateStudentLessonsSet } from '@rooms/services/lessons'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow } from '@rooms/components/parts/calendar/horizontal'

import DateStudentLessonsRow from '@rooms/components/parts/calendar/DateStudentCalendar/DateStudentLessonsRow'

export default function DateStudentDailyCalendar() {
  const {
    lessons,
    students,
    startedAt
  } = useCalendarContext()

  const dateStudentLessonsSet = useMemo(() => {
    return getDateStudentLessonsSet(lessons, {
      students,
      date: startedAt
    })
  }, [lessons, startedAt, students])

  return (
    <CalendarContainer>
      <HoursHeadRow/>
      <DateStudentLessonsRow
        dateStudentLessonsSet={dateStudentLessonsSet} />
    </CalendarContainer>
  )
}
