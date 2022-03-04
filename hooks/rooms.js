import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { ROLE_TYPE } from '../constatnts'
import { db } from '../mocks/db'

export function useCurrentRoomId () {
  const {
    query: {
      roomId
    }
  } = useRouter()
  return roomId
}

export function useRoom (roomId) {
  return db.room.findFirst({
    where: {
      id: {
        equals: roomId
      }
    }
  })
}

export function useRoomUserByRoleType (roomId, roleType) {
  const room = useRoom(roomId)

  const filteredUser = useMemo(() => {
    if (!room) return null
    return room.roles.filter(role => role.type === roleType).map(role => role.user)
  }, [room, roleType])

  return filteredUser
}

export function useStudentsByRoomId (roomId) {
  return useRoomUserByRoleType(roomId, ROLE_TYPE.STUDENT)
}

export function useTeachersByRoomId (roomId) {
  return useRoomUserByRoleType(roomId, ROLE_TYPE.TEACHER)
}

export function useLessons (roomId) {
  const room = useRoom(roomId)
  return room?.lessons
}
