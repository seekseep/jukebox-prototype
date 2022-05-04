import { useMemo, useCallback } from 'react'

import { db } from '../mocks/db'

export function useGetFamilyPath(familyId) {
  return useCallback((pathname = '/') => `/families/${familyId}${pathname}`, [familyId])
}

export function useFamily(familyId) {
  const family = useMemo(() => db.family.findFirst({ where: { id: { equals: familyId } } }), [familyId])
  return family
}
