import { useMemo } from 'react'

import {
  useDocAsObjectQuery,
  useCollectionAsObjectArrayQuery,
  useDeleteDocMutation,
  useUpdateDocMutation,
  useCreateDocMutation
} from '@/hooks/api'

export function useSheetQuery(roomId, sheetId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/sheets/${sheetId}`)
}

export function useSheetsQuery(roomId) {
  return useCollectionAsObjectArrayQuery(`/rooms/${roomId}/sheets`)
}

export function useCreateSheetMutation (roomId) {
  return useCreateDocMutation(roomId && `/rooms/${roomId}/sheets`)
}

export function useUpdateSheetMutation (roomId, sheetId) {
  return useUpdateDocMutation(roomId && sheetId && `/rooms/${roomId}/sheets/${sheetId}`)
}

export function useDeleteSheetMutation (roomId, sheetId) {
  return useDeleteDocMutation(roomId && sheetId && `/rooms/${roomId}/sheets/${sheetId}`)
}

export function useSheetOptions (sheets) {
  return useMemo(() => sheets?.map(({ id: value, name:label }) => ({ label, value })) || [], [sheets])
}
