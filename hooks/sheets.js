import { useMemo } from 'react'

import { createSheet, updateSheet, deleteSheet } from '@/services/api/sheets'

import { useMutation, useDocAsObjectQuery, useCollectioDocRefsQuery, useCollectionAsObjectArrayQuery } from '@/hooks/api'

export function useSheetRefs(roomId) {
  return useCollectioDocRefsQuery(`/rooms/${roomId}/sheets`)
}

export function useSheet(roomId, sheetId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/sheets/${sheetId}`)
}

export function useSheets(roomId) {
  return useCollectionAsObjectArrayQuery(`/rooms/${roomId}/sheets`)
}

export function useCreateSheet (roomId) {
  return useMutation(
    async (sheet) => await createSheet(roomId, sheet)
  )
}

export function useUpdateSheet (roomId, sheetId) {
  return useMutation(
    async (sheet) => await updateSheet(roomId, sheetId, sheet)
  )
}

export function useDeleteSheet (roomId, sheetId) {
  return useMutation(
    async () => await deleteSheet(roomId, sheetId)
  )
}

export function useSheetOptions (sheets) {
  return useMemo(() => sheets?.map(({ id: value, name:label }) => ({ label, value })) || [], [sheets])
}
