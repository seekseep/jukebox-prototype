import { useCallback } from 'react'

export function useGetSchoolPath (schoolId) {
  return useCallback((pathname = '') => `/schools/${schoolId}${pathname}`, [schoolId])
}
