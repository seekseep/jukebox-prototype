import useSWR from 'swr'

import { getUserRoomRoleRefs, getUserSchoolRoleRefs } from '@/services/api/roles'

import { expandSWR } from '@/hooks/api'
import { useCurrentUserId } from '@/hooks/auth'

export function useSchoolRoleRefs () {
  const userId = useCurrentUserId()
  const swr = useSWR([userId, 'roles', 'schools'], getUserSchoolRoleRefs)
  return expandSWR(swr)
}

export function useRoomRoleRefs () {
  const userId = useCurrentUserId()
  const swr = useSWR([userId, 'roles', 'rooms'], getUserRoomRoleRefs)
  return expandSWR(swr)
}
