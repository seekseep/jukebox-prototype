import { useMemo, useCallback } from 'react'

import { useCollectionQuery, useDocumentQuery, useMutation } from './api'

import { createRoom } from '../services/api/rooms'

export function useRoomSchema () {
  return useMemo(() => Yup.object().shape({
    name: Yup.string().required().default('')
  }),[])
}

export function useRooms(schoolId) {
  return useCollectionQuery(`/schools/${schoolId}/rooms`)
}

export function useRoom(schoolId, roomId) {
  return useDocumentQuery(`/schools/${schoolId}/rooms/${roomId}`)
}

export function useCreateRoom (schoolId) {
  return useMutation(
    async (room) => await createRoom(schoolId, room)
  )
}
