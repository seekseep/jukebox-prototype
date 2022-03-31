import { useMemo, useCallback } from "react";
import { db } from "../mocks/db";

export function useGetRoomLink(roomId) {
  return useCallback((pathname = "/") => `/rooms/${roomId}${pathname}`, [roomId])
}

export function useRoomsBySchoolId (schoolId) {
  const rooms = useMemo(() => {
    return db.room.findMany({
      query: {
        where: {
          schoolId: {
            equals: schoolId
          }
        }
      }
    })
  }, [schoolId])

  return rooms
}

export function useRoom (roomId) {
  const room = useMemo(() => {
    return db.room.findFirst({ id: roomId })
  }, [roomId])

  return room
}
