import { CALENDAR_TERM } from '@rooms/constants'

import { HorizontalLayoutProvider } from '@rooms/components/parts/calendar/hooks/layout/horizontal'

import { HEAD_COL_WIDTH } from '@rooms/components/parts/calendar/DateTeacherCalendar/DateTeacherLessonsRow'
import DateTeacherDailyCalendar from '@rooms/components/parts/calendar/DateTeacherCalendar/DateTeacherDailyCalendar'
import DateTeacherWeeklyCalendar from '@rooms/components/parts/calendar/DateTeacherCalendar/DateTeacherWeeklyCalendar'

function TermedCalendar (props)  {
  switch (props.term) {
    case CALENDAR_TERM.DAILY:
      return <DateTeacherDailyCalendar />
    case CALENDAR_TERM.WEEKLY:
      return <DateTeacherWeeklyCalendar />
    default:
      return null
  }
}

export default function DateTeacherCalendar (props) {
  return (
    <HorizontalLayoutProvider headColWidth={HEAD_COL_WIDTH} {...props}>
      <TermedCalendar {...props} />
    </HorizontalLayoutProvider>
  )
}
