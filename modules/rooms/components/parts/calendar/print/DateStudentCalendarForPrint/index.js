// import { CALENDAR_TERM } from '@rooms/constants'

// import { HorizontalLayoutProvider } from '@rooms/components/parts/calendar/print/hooks/layout/horizontal'

// import { HEAD_COL_WIDTH } from '@rooms/components/parts/calendar/print/DateStudentCalendarForPrint/DateStudentLessonsRow'
// import DateStudentDailyCalendar from '@rooms/components/parts/calendar/print/DateStudentCalendarForPrint/DateStudentDailyCalendar'
// import DateStudentWeeklyCalendar from '@rooms/components/parts/calendar/print/DateStudentCalendarForPrint/DateStudentWeeklyCalendar'

// function TermedCalendar (props)  {
//   switch (props.term) {
//     case CALENDAR_TERM.DAILY:
//       return <DateStudentDailyCalendar />
//     case CALENDAR_TERM.WEEKLY:
//       return <DateStudentWeeklyCalendar />
//   }
// }

export default function DateStudentCalendarForPrint () {
  return (
    <div>DateStudentCalendarForPrint</div>
  )
  // return (
  //   <HorizontalLayoutProvider headColWidth={HEAD_COL_WIDTH} {...props}>
  //     <TermedCalendar {...props} />
  //   </HorizontalLayoutProvider>
  // )
}
