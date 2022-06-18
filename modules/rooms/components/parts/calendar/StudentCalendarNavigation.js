import { useMemo } from 'react'

import { CALENDAR_TERM } from '@rooms/constants'
import { Button } from '@/components/parts/buttons'
import {
  DateCalendarField,
  DaysCalendarFiled,
  FieldsRow,
  NavigationContainer,
  TermCalendarField,
  TimesCalendarField
} from '@rooms/components/parts/calendar/calendarNavigation'

export default function StudentCalendarNavigation ({
  current,
  onGoToday,
  onGoPrevious,
  onGoNext,
  onChangeQuery,
  onDownload,
  query
}) {
  const isDaily = useMemo(() => query.term === CALENDAR_TERM.DAILY, [query.term])
  const isWeekly = useMemo(() => query.term === CALENDAR_TERM.WEEKLY, [query.term])
  return (
    <NavigationContainer>
      <FieldsRow>
        <DateCalendarField
            current={current}
            onGoNext={onGoNext}
            onGoToday={onGoToday}
            onGoPrevious={onGoPrevious} />
        <TermCalendarField value={query.term} onChange={term => onChangeQuery({ term })} />
        <div className="flex flex-grow justify-end">
          <Button size="sm" onClick={onDownload}>PDFをダウンロードする</Button>
        </div>
      </FieldsRow>
      <FieldsRow>
        {(isDaily || isWeekly) && (
          <TimesCalendarField
            startHour={query.startHour} endHour={query.endHour}
            onChange={({ startHour, endHour }) => onChangeQuery({ startHour, endHour })} />
        )}
        {isWeekly && (
          <DaysCalendarFiled
            value={query.days}
            onChange={days => onChangeQuery({ days })} />
        )}
      </FieldsRow>
    </NavigationContainer>
  )
}
