import { useCallback, useMemo } from 'react'
import { format, getMonth, isValid, startOfWeek,endOfWeek, add, sub, endOfDay, startOfDay } from 'date-fns'
import locale from 'date-fns/locale/ja'

import { CALENDAR_FORMAT, CALENDAR_TERM } from '@rooms/constants'
import { DATE_FORMAT } from '@/constants'

const CALENDAR_TERMS = Object.values(CALENDAR_TERM)
const CALENDAR_FORMATS = Object.values(CALENDAR_FORMAT)

function parseTerm (term) {
  if (CALENDAR_TERMS.includes(term)) return term
  return CALENDAR_TERM.WEEKLY
}

function dateToDateString (date) {
  return format(date, DATE_FORMAT.ISO_8601)
}

function parseStartedAt(startedAtString, term) {
  const date = isValid(new Date(startedAtString)) ? new Date(startedAtString) : new Date()
  switch(term) {
    case CALENDAR_TERM.WEEKLY:
      return dateToDateString(startOfWeek(date))
    case CALENDAR_TERM.DAILY:
    default:
      return dateToDateString(startOfDay(date))
  }
}

function getFinishedAtString(startedAtString, term) {
  const startedAt = new Date(startedAtString)
  switch(term) {
    case CALENDAR_TERM.WEEKLY:
      return dateToDateString(endOfWeek(startedAt))
    case CALENDAR_TERM.DAILY:
    default:
      return dateToDateString(endOfDay(startedAt))
  }
}

function parseFormat(format) {
  if (CALENDAR_FORMATS.includes(format)) return format
  return CALENDAR_FORMAT.TEACHER
}

function parseIdArrayString (idArrayString) {
  if (typeof idArrayString !== 'string') return []
  return idArrayString.split(',')
}

function parseStartHour (startHour) {
  if (0 <= startHour && startHour <= 22) return parseInt(startHour)
  return 0
}

function parseEndHour (endHour, startHour = 0) {
  if (0 <= endHour && endHour <= 23 && endHour > startHour) return parseInt(endHour)
  return 23
}

export function useParsedQuery(query) {
  return useMemo(() => {
    const parsedQuery = {}

    parsedQuery.roomId = query.roomId
    parsedQuery.term = parseTerm(query.term)
    parsedQuery.format = parseFormat(query.format)
    parsedQuery.startedAt = parseStartedAt(query.startedAt, parsedQuery.term)
    parsedQuery.finishedAt = getFinishedAtString(parsedQuery.startedAt, parsedQuery.term)
    parsedQuery.startHour = parseStartHour(query.startHour)
    parsedQuery.endHour = parseEndHour(query.endHour, parsedQuery.startHour)

    if (query.subjects) parsedQuery.subjects = parseIdArrayString(query.subjects)
    if (query.teachers) parsedQuery.teachers = parseIdArrayString(query.teachers)
    if (query.students) parsedQuery.students = parseIdArrayString(query.students)
    if (query.sheets) parsedQuery.sheets = parseIdArrayString(query.sheets)

    return parsedQuery
  }, [query.endHour, query.format, query.roomId, query.sheets, query.startHour, query.startedAt, query.students, query.subjects, query.teachers, query.term])
}

function getNextStartedAt (date, term) {
  switch(term) {
    case CALENDAR_TERM.WEEKLY:
      return add(startOfWeek(date), { weeks: 1 })
    case CALENDAR_TERM.DAILY:
    default:
      return add(date, { days: 1 })
  }
}

function getNextFinishedAt (date, term) {
  switch(term) {
    case CALENDAR_TERM.WEEKLY:
      return endOfWeek(getNextStartedAt(date, term))
    case CALENDAR_TERM.DAILY:
    default:
      return endOfDay(getNextStartedAt(date, term))
  }
}

function getPreviousStartedAt (date, term) {
  switch(term) {
    case CALENDAR_TERM.WEEKLY:
      return sub(startOfWeek(date), { weeks: 1 })
    case CALENDAR_TERM.DAILY:
    default:
      return sub(date, { days: 1 })
  }
}

function getPreviousFinishedAt (date, term) {
  switch(term) {
    case CALENDAR_TERM.WEEKLY:
      return endOfWeek(getPreviousStartedAt(date, term))
    case CALENDAR_TERM.DAILY:
    default:
      return endOfDay(getPreviousStartedAt(date, term))
  }
}

export function useCalendar (query) {
  const parsedQuery = useParsedQuery(query)
  const { term } = parsedQuery
  const startedAt = useMemo(() => new Date(parsedQuery.startedAt), [parsedQuery.startedAt])

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
      default:
        return format(startedAt, 'yyyy年MM月dd日')
    }
  }, [startedAt, term])

  const getChangedQuery = useCallback((queryDiff = {}) => {
    const query = { ...parsedQuery, ...queryDiff }

    if (query.term === CALENDAR_TERM.DAILY) {
      query.format = CALENDAR_FORMAT.DAY
    }

    return query
  }, [parsedQuery])

  const getNextQuery = useCallback(() => getChangedQuery({
    startedAt : format(getNextStartedAt(startedAt, term), DATE_FORMAT.ISO_8601),
    finishedAt: format(getNextFinishedAt(startedAt, term), DATE_FORMAT.ISO_8601),
  }), [getChangedQuery, startedAt, term])

  const getPreviousQuery = useCallback(() => getChangedQuery({
    startedAt : format(getPreviousStartedAt(startedAt, term), DATE_FORMAT.ISO_8601),
    finishedAt: format(getPreviousFinishedAt(startedAt, term), DATE_FORMAT.ISO_8601),
  }), [getChangedQuery, startedAt, term])

  const getTodayQuery = useCallback(() => getChangedQuery({
    startedAt: format(new Date(), DATE_FORMAT.ISO_8601)
  }), [getChangedQuery])

  return {
    parsedQuery,
    currentLabel,
    getChangedQuery,
    getNextQuery,
    getPreviousQuery,
    getTodayQuery
  }
}
