import { useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import { refEqual } from 'firebase/firestore'

import { createSchedule } from '@/services/api/rooms/schedules'
import {
  useMutation,
  useDocAsObjectQuery,
  useCreateDocMutation,
  useDeleteDocMutation,
  useUpdateDocMutation,
  useCollectionAsObjectArrayQuery
} from '@/hooks/api'
import { getAccountRef } from '@/services/api/rooms/accounts'
import { getSheetRef } from '@/services/api/rooms/sheets'
import { getStudentRef } from '@/services/api/rooms/students'
import { getTeacherRef } from '@/services/api/rooms/teachers'

export function useSchedulesQuery(roomId) {
  return useCollectionAsObjectArrayQuery(roomId && `/rooms/${roomId}/schedules`)
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

export function useResourceScheduleQuery(roomId, resourceRef) {
  const { data: schedules, ...result } = useSchedulesQuery(roomId)

  const studentSchedules = useMemo(() => {
    if (!schedules || !resourceRef) return schedules
    return schedules.filter(schedule => refEqual(schedule.resource, resourceRef))
  }, [resourceRef, schedules])

  return { data: studentSchedules, ...result }
}

export function useStudentSchedulesQuery(roomId, studentId) {
  return useResourceScheduleQuery(roomId, roomId && studentId ? getStudentRef(roomId, studentId) : null)
}

export function useTeacherSchedulesQuery(roomId, teacherId) {
  return useResourceScheduleQuery(roomId, roomId && teacherId ? getTeacherRef(roomId, teacherId) : null)
}

export function useSheetSchedulesQuery(roomId, sheetId) {
  return useResourceScheduleQuery(roomId, roomId && sheetId ? getSheetRef(roomId, sheetId) : null)
}

export function useCreateStudentScheduleMutation (roomId, studentId) {
  return useMutation(
    async (schedule) =>
      await createSchedule(roomId, {
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
