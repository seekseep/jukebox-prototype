import { useCallback } from 'react'

export function useGetAdminPath() {
  return useCallback((pathname = '/') => `/admin${pathname}`, [])
}
