import { useMemo } from 'react'

import { useLessonQuery, useLessonsQuery } from '.'
import { useRelationsQuery } from '../relations'
import { useSchedulesQuery } from '../schedules'
import { useSheetsQuery } from '../sheets'

import { getLessonValidity } from '@rooms/services/lessons/validity'
import { useAccountsQuery } from '../accounts'

export function useLessonValidity(roomId, lessonId) {
  const { data: lesson } = useLessonQuery(roomId, lessonId)

  const { data: lessons } = useLessonsQuery(roomId)
  const { data: accounts } = useAccountsQuery(roomId)
  const { data: sheets } = useSheetsQuery(roomId)
  const { data: relations } = useRelationsQuery(roomId)
  const { data: schedules } = useSchedulesQuery(roomId)

  const { validity, messages  } = useMemo(() => getLessonValidity(lesson, {
    lessons, accounts, sheets, relations, schedules
  }), [accounts, lesson, lessons, relations, schedules, sheets])

  return {
    validity, messages
  }
}
