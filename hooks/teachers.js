import { useMemo } from 'react'
import { db } from '../mocks/db'

import { useRoom } from './rooms'

export function useTeacher (teacherId) {
  const teacher = useMemo(() => db.teacher.findFirst({ where: { id: { equals: teacherId } } }), [teacherId])
  return teacher
}

export function useTeachersByRoomId (roomId) {
  const room = useRoom(roomId)
  const teachers = useMemo(() => room?.teachers || null, [room])
  return teachers
}
