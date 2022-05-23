import useSWR from 'swr'

import { getRoleByResourceAndAccount, createRole } from '@/services/api/roles'
import { expandSWR, useMutation } from '@/hooks/api'
import { getRoomRef } from '@/services/api/rooms'
import { getAccountRef } from '@/services/api/rooms/accounts'
import { getUserRef } from '@/services/api/users'
import { RESOURCE_TYPE } from '@/constants'

export function useRoleQuery(roomId, accountId) {
  const swr = useSWR(
    roomId && accountId && [roomId, accountId, 'role'],
    (roomId, accountId) => {
      return getRoleByResourceAndAccount(
        getRoomRef(roomId),
        getAccountRef(roomId, accountId)
      )
    })
  return expandSWR(swr)
}

export function useCreateRoleMutation (roomId, accountId) {
  return useMutation(
    async ({ userId }) => await createRole({
      resource    : getRoomRef(roomId),
      account     : getAccountRef(roomId, accountId),
      user        : getUserRef(userId),
      resourceType: RESOURCE_TYPE.ROOM
    })
  )
}