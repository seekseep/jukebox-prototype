import { useMemo } from 'react'

import { getDateTeacherLessonsSet } from '@rooms/services/lessons'

import { useCalendarContext } from '@rooms/components/parts/calendar/hooks'
import { CalendarContainer, HoursHeadRow } from '@rooms/components/parts/calendar/horizontal'

import DateTeacherLessonsRow from '@rooms/components/parts/calendar/DateTeacherCalendar/DateTeacherLessonsRow'

export default function DateTeacherDailyCalendar() {
  const {
    lessons,
    teachers,
    startedAt
  } = useCalendarContext()

  const dateTeacherLessonsSet = useMemo(() => {
    return getDateTeacherLessonsSet(lessons, {
      teachers,
      date: startedAt
    })
  }, [lessons, startedAt, teachers])

  return (
    <CalendarContainer>
      <HoursHeadRow/>
      <DateTeacherLessonsRow
        dateTeacherLessonsSet={dateTeacherLessonsSet} />
    </CalendarContainer>
  )
}
