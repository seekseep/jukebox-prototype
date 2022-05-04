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

export function useSheets(schoolId, roomId) {
  return useCollectionQuery(`/schools/${schoolId}/rooms/${roomId}/sheets`)
}

export function useSheet(schoolId, roomId, sheetId) {
  return useDocumentQuery(`/schools/${schoolId}/rooms/${roomId}/sheets/${sheetId}`)
}

export function useSheetsByFamilyId(familyId) {
  const family = useFamily(familyId)
  const sheets = useMemo(() => family?.sheets || null, [family])
  return sheets
}

export function useCreateSheet (schoolId, roomId) {
  return useMutation(
    async (sheet) => {
      return await createSheet(schoolId, roomId, sheet)
    }
  )
}

export function useUpdateSheet (schoolId, roomId, sheetId) {
  return useMutation(
    async (sheet) => {
      return await updateSheet(schoolId, roomId, sheetId, sheet)
    }
  )
}

export function useDeleteSheet (schoolId, roomId, sheetId,) {
  return useMutation(
    async () => {
      return await deleteSheet(schoolId, roomId, sheetId)
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

export function useSheetSchedules (schoolId, roomId, sheetId) {
  const swr = useSWR([schoolId, roomId, sheetId], getSheetSchedules)
  return expandSWR(swr)
}
