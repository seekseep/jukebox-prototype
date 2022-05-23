import {
  useCollectionAsObjectArrayQuery,
  useDocAsObjectQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation
} from '@/hooks/api'

export function useRoomRefsQuery() {
  return useCollectionAsObjectArrayQuery('/rooms')
}

export function useRoomQuery(roomId) {
  return useDocAsObjectQuery(`/rooms/${roomId}`)
}

export function useCreateRoomMutation () {
  return useCreateDocMutation('/rooms')
}

export function useUpdateRoomMutation (roomId) {
  return useUpdateDocMutation(roomId && `/rooms/${roomId}`)
}

export function useDeleteRoomMutation (roomId) {
  return useDeleteDocMutation(roomId && `/rooms/${roomId}`)
}
