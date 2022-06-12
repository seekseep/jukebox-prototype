import { CALENDAR_FORMAT } from '@rooms/constants'

import { CalendarProvider } from '@rooms/components/parts/calendar/hooks'

import DateStudentCalendarForPrint from '@rooms/components/parts/calendar/print/DateStudentCalendarForPrint'
import DateTeacherCalendarForPrint from '@rooms/components/parts/calendar/print/DateTeacherCalendarForPrint'
import TeacherDateCalendarForPrint from '@rooms/components/parts/calendar/print/TeacherDateCalendarForPrint'
import StudentDateCalendarForPrint from '@rooms/components/parts/calendar/print/StudentDateCalendarForPrint'

export function FormattedCalendar (props) {
  switch (props.format) {
    case CALENDAR_FORMAT.DATE_STUDENT:
      return <DateStudentCalendarForPrint {...props} />
    case CALENDAR_FORMAT.DATE_TEACHER:
      return <DateTeacherCalendarForPrint {...props} />
    case CALENDAR_FORMAT.TEACHER_DATE:
      return <TeacherDateCalendarForPrint {...props} />
    case CALENDAR_FORMAT.STUDENT_DATE:
      return <StudentDateCalendarForPrint {...props} />
    default:
      return null
  }
}

export default function CalendarForPrint (props) {
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
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="text-6xl">🙇　調整中　🙇</div>
        </div>
    </CalendarProvider>
  )
}
