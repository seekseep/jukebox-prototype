import { useMutation, useDocAsObjectQuery, useCollectioDocRefsQuery, useCollectionAsObjectArrayQuery } from '@/hooks/api'
import { createAccount, updateAccount, deleteAccount } from '@/services/api/accounts'
import { useMemo } from 'react'

export function useAccountRefs(roomId) {
  return useCollectioDocRefsQuery(`/rooms/${roomId}/accounts`)
}

export function useAccounts (roomId) {
  return useCollectionAsObjectArrayQuery(`/rooms/${roomId}/accounts`)
}

export function useAccount(roomId, accountId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/accounts/${accountId}`)
}

export function useCreateAccount (roomId) {
  return useMutation(
    async (account) => await createAccount(roomId, account)
  )
}

export function useUpdateAccount (roomId, accountId) {
  return useMutation(
    async (account) => await updateAccount(roomId, accountId, account)
  )
}

export function useDeleteAccount (roomId, accountId) {
  return useMutation(
    async () => await deleteAccount(roomId, accountId)
  )
}

export function useAccountOptions(accounts) {
  return useMemo(() => accounts?.map(({ id: value, name: label }) => ({ value, label })) || [], [accounts])
}
