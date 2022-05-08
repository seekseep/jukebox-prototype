import { useMemo, useCallback } from 'react'

export function useGetFamilyPath(familyId) {
  return useCallback((pathname = '/') => `/families/${familyId}${pathname}`, [familyId])
}

export function useFamily() {
  return null
}
