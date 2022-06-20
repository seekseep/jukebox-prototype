import { CALENDAR_FORMAT } from '@rooms/constants'

import { CalendarProvider } from '@rooms/components/parts/calendar/hooks'

import DateStudentCalendar from '@rooms/components/parts/calendar/DateStudentCalendar'
import StudentDateCalendar from '@rooms/components/parts/calendar/StudentDateCalendar'

export function FormattedCalendar (props) {
  switch (props.format) {
    case CALENDAR_FORMAT.DATE_STUDENT:
      return <DateStudentCalendar {...props} />
      case CALENDAR_FORMAT.STUDENT_DATE:
        return <StudentDateCalendar {...props} />
    default:
      return null
  }
}

export default function StudentCalendar (props) {
  return (
    <CalendarProvider {...props}>
      <FormattedCalendar {...props} />
    </CalendarProvider>
  )
}
