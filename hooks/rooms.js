import { useMemo, useCallback } from 'react'
import { db } from '../mocks/db'

import { useSchool } from './schools'

export function useGetRoomLink(roomId) {
  return useCallback((pathname = '/') => `/rooms/${roomId}${pathname}`, [roomId])
}

export function useRoomsBySchoolId (schoolId) {
  const school = useSchool(schoolId)
  const rooms = useMemo(() => school?.rooms || null, [school])
  return rooms
}

export function useRoom (roomId) {
  const room = useMemo(() => db.room.findFirst({ where: { id: { equals: roomId } } }), [roomId])
  return room
}
