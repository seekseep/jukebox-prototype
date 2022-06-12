import { CALENDAR_TERM } from '@rooms/constants'

import { HorizontalLayoutProvider } from '@rooms/components/parts/calendar/hooks/layout/horizontal'

import { HEAD_COL_WIDTH } from '@rooms/components/parts/calendar/StudentDateCalendar/StudentDateLessonsRow'
import StudentDateDailyCalendar from '@rooms/components/parts/calendar/StudentDateCalendar/StudentDateDailyCalendar'
import StudentDateWeeklyCalendar from '@rooms/components/parts/calendar/StudentDateCalendar/StudentDateWeeklyCalendar'
import StudentDateMonthlyCalendar from '@rooms/components/parts/calendar/StudentDateCalendar/StudentDateMonthlyCalendar'

function TermedCalendar (props)  {
  switch (props.term) {
    case CALENDAR_TERM.DAILY:
      return <StudentDateDailyCalendar />
    case CALENDAR_TERM.WEEKLY:
      return <StudentDateWeeklyCalendar />
    case CALENDAR_TERM.MONTHLY:
      return <StudentDateMonthlyCalendar />
  }
}

export default function StudentDateCalendar (props) {
  return (
    <HorizontalLayoutProvider headColWidth={HEAD_COL_WIDTH} {...props}>
      <TermedCalendar {...props} />
    </HorizontalLayoutProvider>
  )
}
