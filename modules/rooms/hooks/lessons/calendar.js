import { useCallback, useMemo } from 'react'
import { format, getMonth, isValid, startOfWeek,endOfWeek, add, sub, endOfDay, startOfDay, startOfMonth, endOfMonth } from 'date-fns'
import locale from 'date-fns/locale/ja'

import { CALENDAR_FORMAT, CALENDAR_TERM } from '@rooms/constants'
import { DATE_FORMAT } from '@/constants'
import {
  downloadRoomCalendars
} from '@rooms/services/calendar/download'
import { useMutation } from '@/hooks/api'

const CALENDAR_TERMS = Object.values(CALENDAR_TERM)
const CALENDAR_FORMATS = Object.values(CALENDAR_FORMAT)

function dateToDateString (date) {
  return format(date, DATE_FORMAT.ISO_8601)
}

function parseTerm (term, defaultValue = CALENDAR_TERM.WEEKLY) {
  if (CALENDAR_TERMS.includes(term)) return term
  return defaultValue
}

function parseStartedAt(startedAtString, term, defaultValue = new Date()) {
  const date = isValid(new Date(startedAtString)) ? new Date(startedAtString) : defaultValue
  switch(term) {
    case CALENDAR_TERM.MONTHLY:
      return startOfMonth(date)
    case CALENDAR_TERM.WEEKLY:
      return startOfWeek(date)
    case CALENDAR_TERM.DAILY:
    default:
      return startOfDay(date)
  }
}

function getFinishedAtString(startedAt, term, defaultValue) {
  switch(term) {
    case CALENDAR_TERM.MONTHLY:
      return endOfMonth(startedAt)
    case CALENDAR_TERM.WEEKLY:
      return endOfWeek(startedAt)
    case CALENDAR_TERM.DAILY:
    default:
      return defaultValue ?? endOfDay(startedAt)
  }
}

function parseFormat(format, defaultValue = CALENDAR_FORMAT.TEACHER_DATE) {
  if (CALENDAR_FORMATS.includes(format)) return format
  return defaultValue
}

function parseStartHour (startHour, defaultValue = 9) {
  if (0 <= startHour && startHour <= 22) return parseInt(startHour)
  return defaultValue
}

function parseEndHour (endHour, startHour = 0) {
  if (0 <= endHour && endHour <= 23 && endHour > startHour) return parseInt(endHour)
  return 21
}

function parseDays (daysValue, defaultValue = '')  {
  if (!daysValue) return defaultValue

  const days = []

  if(typeof daysValue === 'string') {
    days.push(daysValue)
  } else if (daysValue?.length > 0) {
    days.push(...daysValue)
  }

  return days.map(Number).filter(day => 0 <= day && day <= 7)
}

function parseTeacher (teacher, defaultValue = '') {
  return teacher ?? defaultValue
}
function parseStudent (student, defaultValue = '') {
  return student ?? defaultValue
}

export function useParsedQuery(query, defaultQuery = {}) {
  return useMemo(() => {
    const parsedQuery = {}

    parsedQuery.roomId = query.roomId
    parsedQuery.term = parseTerm(query.term, defaultQuery.term)
    parsedQuery.format = parseFormat(query.format, defaultQuery.format)
    parsedQuery.startedAt = parseStartedAt(query.startedAt, parsedQuery.term, defaultQuery.startedAt)
    parsedQuery.finishedAt = getFinishedAtString(parsedQuery.startedAt, parsedQuery.term, defaultQuery.finishedAt)
    parsedQuery.startHour = parseStartHour(query.startHour, defaultQuery.startHour)
    parsedQuery.endHour = parseEndHour(query.endHour, parsedQuery.startHour, defaultQuery.endHour)
    parsedQuery.days = parseDays(query.days, defaultQuery.days)
    parsedQuery.teacher = parseTeacher(query.teacher, defaultQuery.teacher)
    parsedQuery.student = parseStudent(query.student, defaultQuery.student)

    return {
      ...query,
      ...parsedQuery
    }
  }, [defaultQuery.days, defaultQuery.endHour, defaultQuery.finishedAt, defaultQuery.format, defaultQuery.startHour, defaultQuery.startedAt, defaultQuery.student, defaultQuery.teacher, defaultQuery.term, query])
}

function getNextStartedAt (date, term) {
  switch(term) {
    case CALENDAR_TERM.MONTHLY:
      return add(startOfMonth(date), { months: 1 })
    case CALENDAR_TERM.WEEKLY:
      return add(startOfWeek(date), { weeks: 1 })
    case CALENDAR_TERM.DAILY:
    default:
      return add(date, { days: 1 })
  }
}

function getNextFinishedAt (date, term) {
  switch(term) {
    case CALENDAR_TERM.MONTHLY:
      return endOfMonth(getNextStartedAt(date, term))
    case CALENDAR_TERM.WEEKLY:
      return endOfWeek(getNextStartedAt(date, term))
    case CALENDAR_TERM.DAILY:
    default:
      return endOfDay(getNextStartedAt(date, term))
  }
}

function getPreviousStartedAt (date, term) {
  switch(term) {
    case CALENDAR_TERM.MONTHLY:
      return sub(startOfMonth(date), { months: 1 })
    case CALENDAR_TERM.WEEKLY:
      return sub(startOfWeek(date), { weeks: 1 })
    case CALENDAR_TERM.DAILY:
    default:
      return sub(date, { days: 1 })
  }
}

function getPreviousFinishedAt (date, term) {
  switch(term) {
    case CALENDAR_TERM.MONTHLY:
      return endOfMonth(getPreviousStartedAt(date, term))
    case CALENDAR_TERM.WEEKLY:
      return endOfWeek(getPreviousStartedAt(date, term))
    case CALENDAR_TERM.DAILY:
    default:
      return endOfDay(getPreviousStartedAt(date, term))
  }
}

export function useCalendar (router, defaultQuery = {}) {
  const { query, pathname, push } = router
  const parsedQuery = useParsedQuery(query, defaultQuery)
  const { term, startedAt } = parsedQuery

  const currentLabel = useMemo(() => {
    switch (term) {
      case CALENDAR_TERM.DAILY:
        return format(startedAt, 'yyyy年 MM月 dd日(EE)', { locale })
      case CALENDAR_TERM.WEEKLY: {
        const monthLabel = format(startedAt, 'yyyy年 MM月', { locale })
        const start = startOfWeek(startedAt)
        const end = endOfWeek(startedAt)
        const startDateLabel = format(start, 'dd日 (EE)', { locale })
        const endDateLabel = format(end, getMonth(start) === getMonth(end) ? 'dd日(EE)' : 'MM月 dd日(EE)', { locale })

        return `${monthLabel} ${startDateLabel} ~ ${endDateLabel}`
      }
      case CALENDAR_TERM.MONTHLY:
        return format(startedAt, 'yyyy年 MM月', { locale })
      default:
        return format(startedAt, 'yyyy年MM月dd日')
    }
  }, [startedAt, term])

  const getChangedQuery = useCallback((queryDiff = {}) => {
    const query = { ...parsedQuery, ...queryDiff }
    return query
  }, [parsedQuery])

  const getNextQuery = useCallback(() => getChangedQuery({
    startedAt : getNextStartedAt(startedAt, term),
    finishedAt: getNextFinishedAt(startedAt, term),
  }), [getChangedQuery, startedAt, term])

  const getPreviousQuery = useCallback(() => getChangedQuery({
    startedAt : getPreviousStartedAt(startedAt, term),
    finishedAt: getPreviousFinishedAt(startedAt, term),
  }), [getChangedQuery, startedAt, term])

  const getTodayQuery = useCallback(() => getChangedQuery({
    startedAt: new Date()
  }), [getChangedQuery])

  const refresh = useCallback(query => {
    if (query.startedAt) query.startedAt = dateToDateString(query.startedAt)
    if (query.finishedAt) query.finishedAt = dateToDateString(query.finishedAt)
    push({ pathname, query })
  }, [pathname, push])
  const handleGoToday = useCallback(() => refresh(getTodayQuery()), [getTodayQuery, refresh])
  const handleGoPrevious = useCallback(() => refresh(getPreviousQuery()), [getPreviousQuery, refresh])
  const handleGoNext = useCallback(() => refresh(getNextQuery()), [getNextQuery, refresh])

  return {
    parsedQuery,
    currentLabel,
    startedAt,
    getChangedQuery,
    refresh,
    handleGoToday,
    handleGoPrevious,
    handleGoNext,
  }
}

export function useDownlaodCalendars (roomId, resources = {})  {
  return useMutation(
    async ({ options }) => {
      await downloadRoomCalendars(roomId, options, resources)
    }
  )
}
