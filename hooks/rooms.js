import useSWR from 'swr'

import { useCollectionQuery, useDocumentQuery, useMutation, expandSWR } from '@/hooks/api'

import { getSchoolRef } from '@/services/api/schools'
import { createRoom } from '@/services/api/rooms'

export function useRooms(schoolId) {
  return useCollectionQuery(`/schools/${schoolId}/rooms`)
}

export function useRoom(schoolId, roomId) {
  return useDocumentQuery(`/schools/${schoolId}/rooms/${roomId}`)
}

export function useCreateRoom () {
  return useMutation(
    async ({ school: schoolId, ...room }) => {
      room.school = getSchoolRef(schoolId)
      return await createRoom(room)
    }
  )
}
