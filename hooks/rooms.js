import useSWR from 'swr'

import { useCollectionAsObjectArrayQuery, useDocAsObjectQuery, useMutation, expandSWR } from '@/hooks/api'
import { createRoom, getSchoolRoomRefs, updateRoom, deleteRoom } from '@/services/api/rooms'

export function useRoomRefs() {
  return useCollectionAsObjectArrayQuery('/rooms')
}

export function useRoom(roomId) {
  return useDocAsObjectQuery(`/rooms/${roomId}`)
}

export function useSchoolRoomRefs (schoolId) {
  const swr = useSWR([schoolId, 'rooms'], getSchoolRoomRefs)
  return expandSWR(swr)
}

export function useCreateRoom () {
  return useMutation(
    async (room) => await createRoom(room)
  )
}

export function useUpdateRoom (roomId) {
  return useMutation(
    async (room) => await updateRoom(roomId, room)
  )
}

export function useDeleteRoom (roomId) {
  return useMutation(
    async () => await deleteRoom(roomId)
  )
}
