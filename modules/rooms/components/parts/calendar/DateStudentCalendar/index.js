import { CALENDAR_TERM } from '@rooms/constants'

import { HorizontalLayoutProvider } from '@rooms/components/parts/calendar/hooks/layout/horizontal'

import { HEAD_COL_WIDTH } from '@rooms/components/parts/calendar/DateStudentCalendar/DateStudentLessonsRow'
import DateStudentDailyCalendar from '@rooms/components/parts/calendar/DateStudentCalendar/DateStudentDailyCalendar'
import DateStudentWeeklyCalendar from '@rooms/components/parts/calendar/DateStudentCalendar/DateStudentWeeklyCalendar'

function TermedCalendar (props)  {
  switch (props.term) {
    case CALENDAR_TERM.DAILY:
      return <DateStudentDailyCalendar />
    case CALENDAR_TERM.WEEKLY:
      return <DateStudentWeeklyCalendar />
    default:
      return null
  }
}

export default function DateStudentCalendar (props) {
  return (
    <HorizontalLayoutProvider headColWidth={HEAD_COL_WIDTH} {...props}>
      <TermedCalendar {...props} />
    </HorizontalLayoutProvider>
  )
}
