import { useMemo } from 'react'
import useSWR from 'swr'

import { getAccountByUser } from '@/services/api/rooms/accounts'

import {
  useDocAsObjectQuery,
  useCollectionAsObjectArrayQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation,
  expandSWR
} from '@/hooks/api'
import { useCurrentUserId } from '@/hooks/auth'

export function useAccountsQuery (roomId) {
  return useCollectionAsObjectArrayQuery(roomId && `/rooms/${roomId}/accounts`)
}

export function useAccountsByAccountTypeQuery(roomId, accountType) {
  const { data: accounts, ...result } = useAccountsQuery(roomId)

  const specified = useMemo(() => {
    if (!accounts || !accountType) return accounts
    return accounts.filter(account => account.type === accountType)
  }, [accountType, accounts])

  return { data: specified, ...result }
}

export function useAccountQuery(roomId, accountId) {
  return useDocAsObjectQuery((roomId && accountId) && `/rooms/${roomId}/accounts/${accountId}`)
}

export function useCreateAccountMutation (roomId) {
  return useCreateDocMutation(roomId && `/rooms/${roomId}/accounts`)
}

export function useUpdateAccountMutation (roomId, accountId) {
  return useUpdateDocMutation(roomId && accountId && `/rooms/${roomId}/accounts/${accountId}`)
}

export function useDeleteAccountMutation (roomId, accountId) {
  return useDeleteDocMutation(roomId && accountId && `/rooms/${roomId}/accounts/${accountId}`)
}

export function useAccountOptions(accounts) {
  return useMemo(() => accounts?.map(({ id: value, name: label }) => ({ value, label })) || [], [accounts])
}

export function useCurrentAccount(roomId) {
  const userId = useCurrentUserId()
  const swr = useSWR(userId && roomId && [roomId, userId, 'account'], getAccountByUser)
  return expandSWR(swr)
}
