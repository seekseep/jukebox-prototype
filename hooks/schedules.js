import { startOfMonth, endOfMonth, format } from 'date-fns'
import { useMutation, useDocumentQuery, useCollectionQuery } from './api'

import { SCHEDULE_STATUS } from '../constatnts'

import {
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../services/api/schedules'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { Timestamp } from 'firebase/firestore'

export function useScheduleSchema () {
  return useMemo(() => Yup.object().shape({
    status    : Yup.string().oneOf(Object.values(SCHEDULE_STATUS)).default(SCHEDULE_STATUS.UNSUBMITTED),
    startedAt : Yup.string().default(format(startOfMonth(new Date()), 'yyyy-MM-dd')),
    finishedAt: Yup.string().default(format(endOfMonth(new Date()), 'yyyy-MM-dd'))
  }),[])
}

export function useSchedules(schoolId, roomId) {
  return useCollectionQuery(`/schools/${schoolId}/rooms/${roomId}/schedules`)
}

export function useSchedule(schoolId, roomId, scheduleId) {
  return useDocumentQuery(`/schools/${schoolId}/rooms/${roomId}/schedules/${scheduleId}`)
}

export function useCreateSchedule (schoolId, roomId) {
  return useMutation(
    async (schedule) => {

      schedule.startedAt = Timestamp.fromDate(new Date(schedule.startedAt))
      schedule.finishedAt = Timestamp.fromDate(new Date(schedule.finishedAt))

      await createSchedule(schoolId, roomId, schedule)
    }
  )
}

export function useUpdateSchedule (schoolId, roomId, scheduleId) {
  return useMutation(
    async (schedule) => {
      await updateSchedule(schoolId, roomId, scheduleId, schedule)
    }
  )
}

export function useDeleteSchedule (schoolId, roomId, scheduleId) {
  return useMutation(
    async () => {
      await deleteSchedule(schoolId, roomId, scheduleId)
    }
  )
}

export function useScheduleOptions (schedules) {
  return useMemo(() =>
    schedules?.map(schedule => ({
      value: schedule.id,
      label: `${format(schedule.startedAt.toDate(), 'yyyy年MM月dd日')} ~ ${format(schedule.finishedAt.toDate(), 'yyyy年MM月dd日')}`
    })) || []
  ,[schedules])
}
