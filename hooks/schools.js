import { createSchool, deleteSchool, updateSchool } from '@/services/api/schools'
import {
  useCollectionAsObjectArrayQuery,
  useCollectioDocRefsQuery,
  useDocAsObjectQuery,
  useMutation
} from './api'

export function useSchools() {
  return useCollectionAsObjectArrayQuery('/schools')
}

export function useSchoolRefs () {
  return useCollectioDocRefsQuery('/schools')
}

export function useSchool(schoolId) {
  return useDocAsObjectQuery(`/schools/${schoolId}`)
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
