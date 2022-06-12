import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { MultiSuspension } from '@/components/parts/Suspension'

import { useCalendar } from '@rooms/hooks/lessons/calendar'
import { useSearchLessonsQuery } from '@rooms/hooks/lessons'
import { useSubjectsQuery } from '@rooms/hooks/subjects'
import { useTeachersQuery } from '@rooms/hooks/teachers'
import { useStudentsQuery } from '@rooms/hooks/students'
import { useSheetsQuery } from '@rooms/hooks/sheets'

import CalendarNavigation from '@rooms/components/parts/calendar/CalendarNavigation'
import Calendar from '@rooms/components/parts/calendar/Calendar'

export default function ViewCalendar () {
  const { query, push, pathname } = useRouter()

  const {
    parsedQuery,
    currentLabel,
    getTodayQuery,
    getNextQuery,
    getPreviousQuery,
    getChangedQuery,
    startedAt
  } = useCalendar(query)
  const { roomId, term, format, startHour, endHour } = parsedQuery

  const refresh = useCallback(query => push({ pathname, query }), [pathname, push])
  const handleGoToday = useCallback(() => refresh(getTodayQuery()), [getTodayQuery, refresh])
  const handleGoPrevious = useCallback(() => refresh(getPreviousQuery()), [getPreviousQuery, refresh])
  const handleGoNext = useCallback(() => refresh(getNextQuery()), [getNextQuery, refresh])

  // HACK: クエリの扱い方が綺麗じゃない
  const handleGoPrint = useCallback(() => {
    const { roomId, ...params } = parsedQuery
    const searchParams = new URLSearchParams(params)
    window.open(`/rooms/${roomId}/calendar/print?${searchParams.toString()}`, '_blank')
  }, [parsedQuery])

  const lessonsQueryResult = useSearchLessonsQuery(query.roomId, parsedQuery)
  const subjectsQueryResult = useSubjectsQuery(query.roomId)
  const teachersQueryResult = useTeachersQuery(query.roomId)
  const studentsQueryResult = useStudentsQuery(query.roomId)
  const sheetsQueryResult = useSheetsQuery(query.roomId)

  if (!query.roomId) return null

  return (
    <div className="bg-white relative w-full h-full flex flex-col">
      {parsedQuery && (
        <CalendarNavigation
          current={currentLabel}
          query={parsedQuery}
          onGoToday={handleGoToday}
          onGoPrevious={handleGoPrevious}
          onGoNext={handleGoNext}
          onGoPrint={handleGoPrint}
          onChangeQuery={queryDiff => {
            refresh(getChangedQuery(queryDiff))
          }}
        />
      )}
      <div className="overflow-auto">
        <MultiSuspension results={[
          lessonsQueryResult,
          subjectsQueryResult,
          teachersQueryResult,
          studentsQueryResult,
          sheetsQueryResult
        ]}>
          {({ data: [lessons, subjects, teachers, students, sheets] }) =>
            <Calendar
              {...{
                startedAt,
                roomId,
                lessons,
                subjects,
                teachers,
                students,
                sheets,
                format,
                term,
                startHour,
                endHour
              }} />
          }
        </MultiSuspension>
      </div>
    </div>
  )
}
