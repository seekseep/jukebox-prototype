import { useCallback } from 'react'
import useSWR from 'swr'
import { format } from 'date-fns'

import {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSheetScheduleRefs,
  getStudentScheduleRefs,
  getTeacherScheduleRefs
} from '@/services/api/schedules'
import {
  useMutation,
  useDocAsObjectQuery,
  useCollectioDocRefsQuery,
  expandSWR
} from '@/hooks/api'

export function useScheduleRefs(roomId) {
  return useCollectioDocRefsQuery(`/rooms/${roomId}/schedules`)
}

export function useSchedule(roomId, scheduleId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/schedules/${scheduleId}`)
}

export function useStudentScheduleRefs(roomId, studentId) {
  const swr = useSWR([roomId, studentId], getStudentScheduleRefs)
  return expandSWR(swr)
}

export function useTeacherScheduleRefs(roomId, teacherId) {
  const swr = useSWR([roomId, teacherId], getTeacherScheduleRefs)
  return expandSWR(swr)
}

export function useSheetScheduleRefs(roomId, sheetId) {
  const swr = useSWR([roomId, sheetId], getSheetScheduleRefs)
  return expandSWR(swr)
}

export function useCreateSchedule (roomId) {
  return useMutation(
    async (schedule) => await createSchedule(roomId, schedule)
  )
}

export function useUpdateSchedule (roomId, scheduleId) {
  return useMutation(
    async (schedule) => await updateSchedule(roomId, scheduleId, schedule)
  )
}

export function useDeleteSchedule (roomId, scheduleId) {
  return useMutation(
    async () => await deleteSchedule(roomId, scheduleId)
  )
}

export function useGetScheduleLabel () {
  return useCallback((schedule) => {
    const startedAt = schedule.startedAt.toDate()
    const finishedAt = schedule.finishedAt.toDate()

    return `${format(startedAt, 'yyyy/MM/dd HH:mm')} ~ ${format(finishedAt, 'yyyy/MM/dd HH:mm')}`
  }, [])
}
