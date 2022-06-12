import { CALENDAR_TERM, CALENDAR_FORMAT } from '@rooms/constants'

import { Select } from '@/components/parts/forms'
import { Button } from '@/components/parts/buttons'

const FULL_HOURS = Array.from({ length: 24 }).fill(null).map((_, i) => i)

function Label (props) {
  return <label className="text-sm" {...props} />
}

export default function CalendarNavigation ({
  current,
  onGoToday,
  onGoPrevious,
  onGoNext,
  onGoPrint,
  onChangeQuery,
  query,
}) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-white">
      <div className="flex flex-row flex-wrap gap-2">
        <div className="flex gap-2 shrink-0">
          <Button onClick={onGoToday} size="sm" color="secondary">今日</Button>
          <Button onClick={onGoPrevious} size="sm" color="secondary">◀</Button>
          <div className="leading-8 w-72 text-center">{current}</div>
          <Button onClick={onGoNext} size="sm" color="secondary">▶</Button>
        </div>
        <div className="flex gap-2 items-center">
          <Label>種類</Label>
          <Select size="sm" defaultValue={query.format} onChange={({ target: { value: format } }) => onChangeQuery({ format })}>
            <option value={CALENDAR_FORMAT.TEACHER_DATE}>講師 {'>'} 日付</option>
            <option value={CALENDAR_FORMAT.STUDENT_DATE}>生徒 {'>'} 日付</option>
            <option value={CALENDAR_FORMAT.DATE_TEACHER}>日付 {'>'} 講師</option>
            <option value={CALENDAR_FORMAT.DATE_STUDENT}>日付 {'>'} 生徒</option>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <Label>期間</Label>
          <Select size="sm" defaultValue={query.term} onChange={({ target: { value: term } }) => onChangeQuery({ term })}>
            <option value={CALENDAR_TERM.DAILY}>日</option>
            <option value={CALENDAR_TERM.WEEKLY}>週</option>
            {(query.format === CALENDAR_FORMAT.TEACHER_DATE || query.format === CALENDAR_FORMAT.STUDENT_DATE) && (
              <option value={CALENDAR_TERM.MONTHLY}>月</option>
            )}
          </Select>
        </div>
        <div className="flex flex-grow justify-end">
          <Button size="sm" onClick={onGoPrint}>印刷する</Button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {(query.term === CALENDAR_TERM.DAILY || query.term === CALENDAR_TERM.WEEKLY) && (
          <div className="flex gap-2 items-center">
            <Label>時間</Label>
            <Select size="sm" defaultValue={query.startHour} onChange={({ target: { value: startHour } }) => onChangeQuery({ startHour })}>
              {FULL_HOURS.map(hour => (
                <option key={hour} value={hour}>{hour}:00</option>
              ))}
            </Select>
            <div className="text-sm">から</div>
            <Select size="sm" defaultValue={query.endHour} onChange={({ target: { value: endHour } }) => onChangeQuery({ endHour })}>
              {FULL_HOURS.map(hour => {
                if (hour <= query.startHour) return null
                return <option key={hour} value={hour}>{hour}:00</option>
              })}
            </Select>
          </div>
        )}
      </div>
    </div>
  )
}
