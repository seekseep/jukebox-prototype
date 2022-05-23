import useSWR from 'swr'
import { expandSWR, useMutation } from '@/hooks/api'

import { getSchoolRoomRefs, setUpRoom } from '@/services/api/rooms'
import { getSchoolRef } from '@/services/api/schools'
import { getUserRef } from '@/services/api/users'

export function useSchoolRoomRefs (schoolId) {
  const swr = useSWR([schoolId, 'rooms'], getSchoolRoomRefs)
  return expandSWR(swr)
}

export function useSetUpRoomMutation(userId, schoolId) {
  return useMutation(
    async (data) => await setUpRoom(data, getUserRef(userId), getSchoolRef(schoolId))
  )
}
