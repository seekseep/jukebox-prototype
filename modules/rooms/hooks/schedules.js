import { useCallback } from 'react'
import useSWR from 'swr'
import { format } from 'date-fns'

import {
  createSchedule,
  getSheetScheduleRefs,
  getStudentScheduleRefs,
  getTeacherScheduleRefs
} from '@/services/api/rooms/schedules'
import {
  useMutation,
  useDocAsObjectQuery,
  useCollectioDocRefsQuery,
  expandSWR,
  useCreateDocMutation,
  useDeleteDocMutation,
  useUpdateDocMutation
} from '@/hooks/api'
import { getAccountRef } from '@/services/api/rooms/accounts'
import { getSheetRef } from '@/services/api/rooms/sheets'

export function useScheduleRefsQuery(roomId) {
  return useCollectioDocRefsQuery(roomId && `/rooms/${roomId}/schedules`)
}

export function useScheduleQuery(roomId, scheduleId) {
  return useDocAsObjectQuery(roomId && scheduleId && `/rooms/${roomId}/schedules/${scheduleId}`)
}

export function useCreateSchedule (roomId) {
  return useCreateDocMutation(`/rooms/${roomId}/schedules`)
}

export function useUpdateSchedule (roomId, scheduleId) {
  return useUpdateDocMutation(roomId && scheduleId && `/rooms/${roomId}/schedules/${scheduleId}`)
}

export function useDeleteSchedule (roomId, scheduleId) {
  return useDeleteDocMutation(roomId && scheduleId && `/rooms/${roomId}/schedules/${scheduleId}`)
}

export function useStudentScheduleRefsQuery(roomId, studentId) {
  const swr = useSWR(roomId && studentId && [roomId, studentId, 'schedules'], getStudentScheduleRefs)
  return expandSWR(swr)
}

export function useTeacherScheduleRefsQuery(roomId, teacherId) {
  const swr = useSWR(roomId && teacherId && [roomId, teacherId, 'schedules'], getTeacherScheduleRefs)
  return expandSWR(swr)
}

export function useSheetScheduleRefsQuery(roomId, sheetId) {
  const swr = useSWR([roomId, sheetId], getSheetScheduleRefs)
  return expandSWR(swr)
}

export function useCreateStudentScheduleMutation (roomId, studentId) {
  return useMutation(
    async (schedule) => await createSchedule(roomId, {
      ...schedule,
      resource: getAccountRef(roomId, studentId)
    })
  )
}

export function useCreateTeacherScheduleMutation (roomId, studentId) {
  return useMutation(
    async (schedule) => await createSchedule(roomId, {
      ...schedule,
      resource: getAccountRef(roomId, studentId)
    })
  )
}

export function useCreateSheetScheduleMutation (roomId, sheetId) {
  return useMutation(
    async (schedule) => await createSchedule(roomId, {
      ...schedule,
      resource: getSheetRef(roomId, sheetId)
    })
  )
}


export function useGetScheduleLabel () {
  return useCallback((schedule) => {
    const startedAt = schedule.startedAt.toDate()
    const finishedAt = schedule.finishedAt.toDate()
    return `${format(startedAt, 'yyyy/MM/dd HH:mm')} ~ ${format(finishedAt, 'yyyy/MM/dd HH:mm')}`
  }, [])
}
