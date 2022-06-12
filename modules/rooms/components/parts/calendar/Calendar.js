import { CALENDAR_FORMAT } from '@rooms/constants'

import { CalendarProvider } from '@rooms/components/parts/calendar/hooks'

import DateStudentCalendar from '@rooms/components/parts/calendar/DateStudentCalendar'
import DateTeacherCalendar from '@rooms/components/parts/calendar/DateTeacherCalendar'
import TeacherDateCalendar from '@rooms/components/parts/calendar/TeacherDateCalendar'
import StudentDateCalendar from '@rooms/components/parts/calendar/StudentDateCalendar'

export function FormattedCalendar (props) {
  switch (props.format) {
    case CALENDAR_FORMAT.DATE_STUDENT:
      return <DateStudentCalendar {...props} />
    case CALENDAR_FORMAT.DATE_TEACHER:
      return <DateTeacherCalendar {...props} />
    case CALENDAR_FORMAT.TEACHER_DATE:
      return <TeacherDateCalendar {...props} />
      case CALENDAR_FORMAT.STUDENT_DATE:
        return <StudentDateCalendar {...props} />
    default:
      return null
  }
}

export default function Calendar (props) {
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
