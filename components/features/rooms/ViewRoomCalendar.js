import { add, getMonth, getYear, sub } from 'date-fns'
import { useState } from 'react'
import { CALENDAR_MODE } from '../../../constatnts'

import { useRoomLessonEvents } from '../../../hooks/rooms'

import MonthlyCalendar from '../../parts/calendars/MonthlyCalendar'

export default function ViewRoomCalendar ({ roomId }) {
  const events = useRoomLessonEvents(roomId)
  const [mode, setMode] = useState(CALENDAR_MODE.MONTH)

  const [{ year, month, week }, setState] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  })

  const handleMonth = (amount) => {
    const date = add(new Date(year, month, 1), { months: amount })
    setState({
      year: getYear(date),
      month: getMonth(date),
      week: 0
    })
  }

  return events && (
    <MonthlyCalendar
      year={year} month={month}
      events={events}
      onGoNext={() => handleMonth(1)}
      onGoBack={() => handleMonth(-1)} />
  )
}
