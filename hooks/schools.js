import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'

import { createSchool, deleteSchool, updateSchool } from '../services/api/schools'

import { useCollectionQuery, useDocumentQuery, useMutation } from './api'

export function useSchoolSchema(options) {
  return useMemo(() => Yup.object().shape({
    name: Yup.string().default('')
  }), [])
}

export function useSchools() {
  return useCollectionQuery('/schools')
}

export function useSchool(schoolId) {
  return useDocumentQuery(`/schools/${schoolId}`)
}

export function useCreateSchool () {
  return useMutation(
    async (school) => await createSchool(school)
  )
}

export function useUpdateSchool (schoolId) {
  return useMutation(
    async (school) => await updateSchool(schoolId, school)
  )
}

export function useDeleteSchool (schoolId) {
  return useMutation(
    async () => await deleteSchool(schoolId)
  )
}
