import { useRouter } from 'next/router'
import { useCallback } from 'react'

import Card, { CardBody } from '@/components/parts/Card'
import { Select } from '@/components/parts/forms'
import { MultiSuspension } from '@/components/parts/Suspension'
import { Button } from '@/components/parts/buttons'

import { CALENDAR_FORMAT, CALENDAR_TERM } from '@rooms/constants'
import { useCalendar } from '@rooms/hooks/lessons/calendar'
import WeeklyLessonsCalendarByTeacher from '@rooms/components/parts/lessons/WeeklyLessonsCalendarByTeacher'
import WeeklyLessonsCalendarByDay from '@rooms/components/parts/lessons/WeeklyLessonsCalendarByDay'
import DailyLessonsCalendar from '@rooms/components/parts/lessons/DailyLessonsCalendar'
import { useSearchLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'

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
  const { term, format } = parsedQuery

  const refresh = useCallback(query => push({ pathname, query }), [pathname, push])
  const handleGoToday = useCallback(() => refresh(getTodayQuery()), [getTodayQuery, refresh])
  const handleGoPrevious = useCallback(() => refresh(getPreviousQuery()), [getPreviousQuery, refresh])
  const handleGoNext = useCallback(() => refresh(getNextQuery()), [getNextQuery, refresh])

  // HACK: クエリの扱い方が綺麗じゃない
  const handleGoPrintPage = useCallback(() => {
    const { roomId, params } = parsedQuery
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
    <Card>
      <CardBody>
        <div className="flex gap-x-4 gap-y-2 items-start flex-wrap">
          <div className="flex gap-2 shrink-0">
            <button onClick={handleGoToday} className="bg-gray-50 border border-gray-100 text-center leading-10 h-10 rounded cursor-pointer hover:bg-gray-100 active:bg-gray-200 px-4">今日</button>
            <button onClick={handleGoPrevious} className="bg-gray-50 border border-gray-100 text-center leading-10 w-10 h-10 rounded cursor-pointer hover:bg-gray-100 active:bg-gray-200">◀</button>
            <div className="leading-10 text-lg w-96 text-center">{currentLabel}</div>
            <button onClick={handleGoNext} className="bg-gray-50 border border-gray-100 text-center leading-10 w-10 h-10 rounded cursor-pointer hover:bg-gray-100 active:bg-gray-200">▶</button>
          </div>
          <div className="flex gap-2 items-center">
            <div>表示する期間</div>
            <Select defaultValue={term} onChange={({ target: { value: term } }) => refresh(getChangedQuery({ term }))}>
              <option value={CALENDAR_TERM.WEEKLY}>週</option>
              <option value={CALENDAR_TERM.DAILY}>日</option>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <div>形式</div>
            <Select defaultValue={format} onChange={({ target: { value: format } }) => refresh(getChangedQuery({ format }))}>
              <option value={CALENDAR_FORMAT.TEACHER}>講師別</option>
              {term === CALENDAR_TERM.WEEKLY && <option value={CALENDAR_FORMAT.DAY}>曜日別</option>}
            </Select>
          </div>
          <div className="flex flex-grow justify-end">
            <Button onClick={handleGoPrintPage}>表示している内容を印刷する</Button>
          </div>
        </div>
      </CardBody>
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
              <WeeklyLessonsCalendarByTeacher {...{ startedAt: new Date(parsedQuery.startedAt), lessons, subjects, teachers, students, sheets }} />
            )}
            {term === CALENDAR_TERM.WEEKLY && format === CALENDAR_FORMAT.DAY && (
              <WeeklyLessonsCalendarByDay {...{ startedAt: new Date(parsedQuery.startedAt), lessons, subjects, teachers, students, sheets }} />
            )}
            {term === CALENDAR_TERM.DAILY && (
              <DailyLessonsCalendar {...{ startedAt: new Date(parsedQuery.startedAt), lessons, subjects, teachers, students, sheets }} />
            )}
          </>
        )}
      </MultiSuspension>
    </Card>
  )
}
