import { useMemo } from 'react'

import { CALENDAR_TERM, CALENDAR_FORMAT } from '@rooms/constants'
import { Button } from '@/components/parts/buttons'
import {
  DateCalendarField,
  DaysCalendarFiled,
  FieldsRow,
  FormatCalendarField,
  NavigationContainer,
  StudentCalendarField,
  TeacherCalendarFiled,
  TermCalendarField,
  TimesCalendarField
} from '@rooms/components/parts/calendar/calendarNavigation'

export default function RoomCalendarNavigation ({
  current,
  onGoToday,
  onGoPrevious,
  onGoNext,
  onChangeQuery,
  onDownload,
  query,

  students,
  teachers,
}) {
  const isDaily = useMemo(() => query.term === CALENDAR_TERM.DAILY, [query.term])
  const isWeekly = useMemo(() => query.term === CALENDAR_TERM.WEEKLY, [query.term])
  const isStudentDate = useMemo(() => query.format === CALENDAR_FORMAT.STUDENT_DATE, [query.format])
  const isTeacherDate = useMemo(() => query.format === CALENDAR_FORMAT.TEACHER_DATE, [query.format])
  return (
    <NavigationContainer>
      <FieldsRow>
        <DateCalendarField
            current={current}
            onGoNext={onGoNext}
            onGoToday={onGoToday}
            onGoPrevious={onGoPrevious} />
        <FormatCalendarField
          value={query.format} onChange={format => onChangeQuery({ format })} />
        <TermCalendarField
          value={query.term} onChange={term => onChangeQuery({ term })}
          isDisabledMontly={!(isTeacherDate || isStudentDate)} />
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
        {isStudentDate && (
          <StudentCalendarField
            value={query.student} students={students}
            onChange={student => onChangeQuery({ student })} />
        )}
        {isTeacherDate && (
          <TeacherCalendarFiled
            value={query.teacher} teachers={teachers}
            onChange={teacher => onChangeQuery({ teacher })} />
        )}
      </FieldsRow>
    </NavigationContainer>
  )
}
