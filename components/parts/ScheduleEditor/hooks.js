import { createContext, useContext, useMemo } from 'react'
import { db } from '../../../mocks/db'

const Context = createContext()

export function Provider ({ roomId, scheduleId, ...props }) {
  return (
    <Context.Provider
      value={{ roomId, scheduleId }}
      {...props} />
  )
}

export function useRoom () {
  const { roomId } = useContext(Context)
  const room = useMemo(() => db.room.findFirst({ where: { id: { equals: roomId } } }), [roomId])
  return room
}

export function useSchedule () {
  const { scheduleId } = useContext(Context)
  const schedule = useMemo(() => db.schedule.findFirst({ where: { id: { equals: scheduleId } } }), [scheduleId])
  return schedule
}
