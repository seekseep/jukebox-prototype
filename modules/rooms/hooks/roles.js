import useSWR from 'swr'
import { RESOURCE_TYPE } from '@/constants'

import { getUserRef } from '@/services/api/users'
import { getRoleByResourceAndAccount, createRole, getRoleByResourceAndUser } from '@/services/api/roles'
import { expandSWR, useMutation } from '@/hooks/api'

import { getRoomRef } from '@rooms/services/api/rooms'
import { getAccountRef } from '@rooms/services/api/accounts'

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

export function useUserRoleQuery(roomId, userId) {
  const swr = useSWR(
    roomId && userId && [roomId, userId, 'role'],
    (roomId, userId) => {
      return getRoleByResourceAndUser(
        getRoomRef(roomId),
        getUserRef(userId)
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
