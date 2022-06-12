import { CALENDAR_TERM } from '@rooms/constants'

import { HorizontalLayoutProvider } from '@rooms/components/parts/calendar/hooks/layout/horizontal'

import { HEAD_COL_WIDTH } from '@rooms/components/parts/calendar/TeacherDateCalendar/TeacherDateLessonsRow'
import TeacherDateDailyCalendar from '@rooms/components/parts/calendar/TeacherDateCalendar/TeacherDateDailyCalendar'
import TeacherDateWeeklyCalendar from '@rooms/components/parts/calendar/TeacherDateCalendar/TeacherDateWeeklyCalendar'
import TeacherDateMonthlyCalendar from '@rooms/components/parts/calendar/TeacherDateCalendar/TeacherDateMonthlyCalendar'

function TermedCalendar (props)  {
  switch (props.term) {
    case CALENDAR_TERM.DAILY:
      return <TeacherDateDailyCalendar />
    case CALENDAR_TERM.WEEKLY:
      return <TeacherDateWeeklyCalendar />
    case CALENDAR_TERM.MONTHLY:
      return <TeacherDateMonthlyCalendar />
  }
}

export default function TeacherDateCalendar (props) {
  return (
    <HorizontalLayoutProvider headColWidth={HEAD_COL_WIDTH} {...props}>
      <TermedCalendar {...props} />
    </HorizontalLayoutProvider>
  )
}
