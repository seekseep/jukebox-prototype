import { useMemo } from 'react'

import { getWeekDayTeacherLessonsSets } from '@rooms/services/lessons'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow } from '@rooms/components/parts/calendar/horizontal'

import DateTeacherLessonsRow from '@rooms/components/parts/calendar/DateTeacherCalendar/DateTeacherLessonsRow'

export default function DateTeacherWeeklyCalendar() {
  const {
    lessons,
    teachers,
    startedAt,
    days
  } = useCalendarContext()

  const dateTeacherLessonsSets = useMemo(() => {
    return getWeekDayTeacherLessonsSets(lessons, {
      days,
      startedAt,
      teachers
    })
  }, [days, lessons, startedAt, teachers])

  return (
    <CalendarContainer>
      <HoursHeadRow/>
      {dateTeacherLessonsSets.map(dateTeacherLessonsSet => (
        <DateTeacherLessonsRow
          key={dateTeacherLessonsSet.date.getTime()}
          dateTeacherLessonsSet={dateTeacherLessonsSet} />
      ))}
    </CalendarContainer>
  )
}
