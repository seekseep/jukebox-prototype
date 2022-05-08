import useSWR from 'swr'
import { useMemo } from 'react'
import * as Yup from 'yup'

import {
  createSheet,
  updateSheet,
  deleteSheet,
  getSheetSchedules,
} from '../services/api/sheets'

import { useDocumentQuery, useCollectionQuery, useMutation, expandSWR } from './api'

import { useFamily } from './families'

export function useSheetSchema () {
  return useMemo(() => Yup.object().shape({
    name: Yup.string().required().default('')
  }),[])
}

export function useSheets(roomId) {
  return useCollectionQuery(`/rooms/${roomId}/sheets`)
}

export function useSheet(roomId, sheetId) {
  return useDocumentQuery(`/rooms/${roomId}/sheets/${sheetId}`)
}

export function useSheetsByFamilyId(familyId) {
  const family = useFamily(familyId)
  const sheets = useMemo(() => family?.sheets || null, [family])
  return sheets
}

export function useCreateSheet (roomId) {
  return useMutation(
    async (sheet) => {
      return await createSheet(roomId, sheet)
    }
  )
}

export function useUpdateSheet (roomId, sheetId) {
  return useMutation(
    async (sheet) => {
      return await updateSheet(roomId, sheetId, sheet)
    }
  )
}

export function useDeleteSheet (roomId, sheetId,) {
  return useMutation(
    async () => {
      return await deleteSheet(roomId, sheetId)
    }
  )
}

export function useSheetOptions (sheets) {
  return useMemo(() =>
    sheets?.map(sheet => ({
      value: sheet.id,
      label: sheet.name
    })) || []
  ,[sheets])
}

export function useSheetSchedules (roomId, sheetId) {
  const swr = useSWR([roomId, sheetId], getSheetSchedules)
  return expandSWR(swr)
}
