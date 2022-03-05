import classNames from 'classnames'
import { add } from 'date-fns'
import { useState } from 'react'
import { CALENDAR_MODE } from '../../../constatnts'

import { useRoomLessonEvents } from '../../../hooks/rooms'

import MonthlyCalendar from '../../parts/calendars/MonthlyCalendar'
import WeeklyCalendar from '../../parts/calendars/WeeklyCalendar'

export default function ViewRoomCalendar ({ roomId }) {
  const events = useRoomLessonEvents(roomId)
  const [mode, setMode] = useState(CALENDAR_MODE.WEEKLY)

  const [startDate, setStartDate] = useState(new Date())

  const handleMonthlyChange = (amount) => {
    setStartDate(add(startDate, { months: amount }))
  }

  const handleWeeklyChange = (amount) => {
    setStartDate(add(startDate, { weeks: amount }))
  }

  const isLoading = !events

  if (isLoading) return null

  return (
    <div className="flex flex-col p-3 gap-3">
      <div>
        <button
          onClick={() => setMode(CALENDAR_MODE.WEEKLY)}
          className={classNames(
            'rounded-l py-1 px-2',
            {
              'bg-gray-200': mode === CALENDAR_MODE.MONTHLY,
              'bg-gray-300 shadow-inner': mode === CALENDAR_MODE.WEEKLY
            }
          )}>
            週ごと
        </button>
        <button
          onClick={() => setMode(CALENDAR_MODE.MONTHLY)}
          className={classNames(
            'rounded-r py-1 px-2',
            {
              'bg-gray-200': mode === CALENDAR_MODE.WEEKLY,
              'bg-gray-300 shadow-inner': mode === CALENDAR_MODE.MONTHLY
            }
          )}>
            月ごと
        </button>
      </div>
      {mode === CALENDAR_MODE.WEEKLY && (
        <WeeklyCalendar
          startDate={startDate} events={events}
          onGoNext={() => handleWeeklyChange(1)}
          onGoBack={() => handleWeeklyChange(-1)} />
      )}
      {mode === CALENDAR_MODE.MONTHLY && (
        <MonthlyCalendar
          startDate={startDate} events={events}
          onGoNext={() => handleMonthlyChange(1)}
          onGoBack={() => handleMonthlyChange(-1)} />
      )}
    </div>
  )
}
