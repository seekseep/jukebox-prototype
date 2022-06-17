import useSWR from 'swr'
import { expandSWR, useMutation } from '@/hooks/api'


import { getUserRef } from '@/services/api/users'

import { getSchoolRef } from '@schools/services/api/schools'
import { getSchoolRoomRefs, setUpRoom } from '@schools/services/api/rooms'

export function useSchoolRoomRefs (schoolId) {
  const swr = useSWR([schoolId, 'rooms'], getSchoolRoomRefs)
  return expandSWR(swr)
}

export function useSetUpRoomMutation(userId, schoolId) {
  return useMutation(
    async (data) => await setUpRoom(data, getUserRef(userId), getSchoolRef(schoolId))
  )
}
