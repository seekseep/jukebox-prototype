import { createSchool, deleteSchool, setUpSchool, updateSchool } from '@schools/services/api/schools'
import { getUserRef } from '@/services/api/users'
import {
  useCollectionAsObjectArrayQuery,
  useDocAsObjectQuery,
  useMutation
} from '@/hooks/api'

export function useSchools() {
  return useCollectionAsObjectArrayQuery('/schools')
}

export function useSchool(schoolId) {
  return useDocAsObjectQuery(`/schools/${schoolId}`)
}

export function useSetUpSchoolMutation (userId) {
  return useMutation(
    async (data) => await setUpSchool(data, getUserRef(userId))
  )
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
