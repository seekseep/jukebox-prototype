// import { CALENDAR_TERM } from '@rooms/constants'

// import { HorizontalLayoutProvider } from '@rooms/components/parts/calendar/print/hooks/layout/horizontal'

// import { HEAD_COL_WIDTH } from '@rooms/components/parts/calendar/print/DateTeacherCalendarForPrint/DateTeacherLessonsRow'
// import DateTeacherDailyCalendar from '@rooms/components/parts/calendar/print/DateTeacherCalendarForPrint/DateTeacherDailyCalendar'
// import DateTeacherWeeklyCalendar from '@rooms/components/parts/calendar/print/DateTeacherCalendarForPrint/DateTeacherWeeklyCalendar'

// function TermedCalendar (props)  {
//   switch (props.term) {
//     case CALENDAR_TERM.DAILY:
//       return <DateTeacherDailyCalendar />
//     case CALENDAR_TERM.WEEKLY:
//       return <DateTeacherWeeklyCalendar />
//   }
// }

export default function DateTeacherCalendarForPrint () {
  return (
    <div>DateTeacherCalendarForPrint</div>
  )
  // return (
  //   <HorizontalLayoutProvider headColWidth={HEAD_COL_WIDTH} {...props}>
  //     <TermedCalendar {...props} />
  //   </HorizontalLayoutProvider>
  // )
}
