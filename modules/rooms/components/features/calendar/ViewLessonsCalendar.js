import { useRouter } from 'next/router'
import { useCallback } from 'react'

import Card, { CardBody } from '@/components/parts/Card'
import { Select } from '@/components/parts/forms'
import { MultiSuspension } from '@/components/parts/Suspension'
import { Button } from '@/components/parts/buttons'

import { CALENDAR_FORMAT, CALENDAR_TERM } from '@rooms/constants'
import { useCalendar } from '@rooms/hooks/lessons/calendar'
import WeeklyLessonsCalendarByTeacher from '@rooms/components/parts/calendar/WeeklyLessonsCalendarByTeacher'
import WeeklyLessonsCalendarByDay from '@rooms/components/parts/calendar/WeeklyLessonsCalendarByDay'
import DailyLessonsCalendar from '@rooms/components/parts/calendar/DailyLessonsCalendar'
import { useSearchLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'

const START_HOURS = Array.from({ length: 23 }).fill(null).map((_, i) => i)
const END_HORUS = Array.from({ length: 23 }).fill(null).map((_, i) => 1 + i)

export default function ViewLessonsCalendar () {
  const { query, push, pathname } = useRouter()

  const {
    parsedQuery,
    currentLabel,
    getTodayQuery,
    getNextQuery,
    getPreviousQuery,
    getChangedQuery
  } = useCalendar(query)
  const { roomId, term, format, startHour, endHour } = parsedQuery

  const refresh = useCallback(query => push({ pathname, query }), [pathname, push])
  const handleGoToday = useCallback(() => refresh(getTodayQuery()), [getTodayQuery, refresh])
  const handleGoPrevious = useCallback(() => refresh(getPreviousQuery()), [getPreviousQuery, refresh])
  const handleGoNext = useCallback(() => refresh(getNextQuery()), [getNextQuery, refresh])

  // HACK: クエリの扱い方が綺麗じゃない
  const handleGoPrintPage = useCallback(() => {
    const { roomId, ...params } = parsedQuery
    const searchParams = new URLSearchParams(params)
    window.open(`/rooms/${roomId}/lessons/print?${searchParams.toString()}`, '_blank')
  }, [parsedQuery])

  const lessonsQueryResult = useSearchLessonsQuery(query.roomId, parsedQuery)
  const subjectsQueryResult = useSubjectsQuery(query.roomId)
  const teachersQueryResult = useTeachersQuery(query.roomId)
  const studentsQueryResult = useStudentsQuery(query.roomId)
  const sheetsQueryResult = useSheetsQuery(query.roomId)

  if (!query.roomId) return null

  return (
    <div className="bg-white relative w-full h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="flex gap-x-4 gap-y-2 items-start flex-wrap">
          <div className="flex gap-2 shrink-0">
            <button onClick={handleGoToday} className="bg-gray-50 border border-gray-100 text-center leading-10 h-10 rounded cursor-pointer hover:bg-gray-100 active:bg-gray-200 px-4">今日</button>
            <button onClick={handleGoPrevious} className="bg-gray-50 border border-gray-100 text-center leading-10 w-10 h-10 rounded cursor-pointer hover:bg-gray-100 active:bg-gray-200">◀</button>
            <div className="leading-10 text-lg w-96 text-center">{currentLabel}</div>
            <button onClick={handleGoNext} className="bg-gray-50 border border-gray-100 text-center leading-10 w-10 h-10 rounded cursor-pointer hover:bg-gray-100 active:bg-gray-200">▶</button>
          </div>
          <div className="flex gap-2 items-center">
            <div>期間種別</div>
            <Select defaultValue={term} onChange={({ target: { value: term } }) => refresh(getChangedQuery({ term }))}>
              <option value={CALENDAR_TERM.WEEKLY}>週</option>
              <option value={CALENDAR_TERM.DAILY}>日</option>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <div>表示形式</div>
            <Select defaultValue={format} onChange={({ target: { value: format } }) => refresh(getChangedQuery({ format }))}>
              <option value={CALENDAR_FORMAT.TEACHER}>講師別</option>
              {term === CALENDAR_TERM.WEEKLY && <option value={CALENDAR_FORMAT.DAY}>曜日別</option>}
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <div>表示時間</div>
            <Select defaultValue={startHour} onChange={({ target: { value: startHour } }) => refresh(getChangedQuery({ startHour }))}>
              {START_HOURS.map(hour => (
                <option key={hour} value={hour}>{hour}:00</option>
              ))}
            </Select>
            <div>から</div>
            <Select defaultValue={endHour} onChange={({ target: { value: endHour } }) => refresh(getChangedQuery({ endHour }))}>
              {END_HORUS.map(hour => {
                if (hour <= startHour) return null
                return <option key={hour} value={hour}>{hour}:00</option>
              })}
            </Select>
          </div>
          <div className="flex flex-grow justify-end">
            <Button onClick={handleGoPrintPage}>表示している内容を印刷する</Button>
          </div>
        </div>
      <MultiSuspension results={[
        lessonsQueryResult,
        subjectsQueryResult,
        teachersQueryResult,
        studentsQueryResult,
        sheetsQueryResult
      ]}>
        {({ data: [lessons, subjects, teachers, students, sheets] }) => (
          <>
            {term === CALENDAR_TERM.WEEKLY && format === CALENDAR_FORMAT.TEACHER && (
              <WeeklyLessonsCalendarByTeacher {...{ roomId, startedAt: new Date(parsedQuery.startedAt), lessons, subjects, teachers, students, sheets, startHour, endHour }} />
            )}
            {term === CALENDAR_TERM.WEEKLY && format === CALENDAR_FORMAT.DAY && (
              <WeeklyLessonsCalendarByDay {...{ roomId, startedAt: new Date(parsedQuery.startedAt), lessons, subjects, teachers, students, sheets, startHour, endHour }} />
            )}
            {term === CALENDAR_TERM.DAILY && (
              <DailyLessonsCalendar {...{ roomId, startedAt: new Date(parsedQuery.startedAt), lessons, subjects, teachers, students, sheets, startHour, endHour }} />
            )}
          </>
        )}
      </MultiSuspension>
    </div>
  )
}
