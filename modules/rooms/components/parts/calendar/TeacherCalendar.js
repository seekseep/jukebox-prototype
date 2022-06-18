import { CALENDAR_FORMAT } from '@rooms/constants'

import { CalendarProvider } from '@rooms/components/parts/calendar/hooks'

import DateTeacherCalendar from '@rooms/components/parts/calendar/DateTeacherCalendar'
import TeacherDateCalendar from '@rooms/components/parts/calendar/TeacherDateCalendar'

export function FormattedCalendar (props) {
  switch (props.format) {
    case CALENDAR_FORMAT.DATE_TEACHER:
      return <DateTeacherCalendar {...props} />
    case CALENDAR_FORMAT.TEACHER_DATE:
      return <TeacherDateCalendar {...props} />
    default:
      return null
  }
}

export default function TeacherCalendar (props) {
  const {
    roomId,
    days,
    startedAt,
    startHour,
    endHour,
    teachers,
    students,
    lessons
  } = props

  return (
    <CalendarProvider
      {...{
        roomId,
        lessons,
        startedAt,
        teachers,
        students,
        days,
        startHour,
        endHour
      }} >
      <FormattedCalendar {...props} />
    </CalendarProvider>
  )
}
