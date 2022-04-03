import { useMemo } from 'react'
import { db } from '../mocks/db'
import { useRoom } from './rooms'

export function useSchedule(scheduleId) {
  const schedule = useMemo(() => db.schedule.findFirst({ where: { id: { equals: scheduleId } } }), [scheduleId])
  return schedule
}

export function useSchedulesByRoomId (roomId) {
  const room = useRoom(roomId)
  const schedules = useMemo(() => room?.schedules || null, [room?.schedules])
  return schedules
}
