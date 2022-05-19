import useSWR from 'swr'

import { ACCOUNT_TYPE } from '@/constatnts'

import { createAccount, deleteAccount, updateAccount, getParentAccountRefs } from '@/services/api/accounts'

import { useMutation, expandSWR } from '@/hooks/api'
import { useAccount } from '@/hooks/accounts'

export function useParentRefs(roomId) {
  const swr = useSWR([roomId, 'parents'], getParentAccountRefs)
  return expandSWR(swr)
}

export function useParent(roomId, parentId) {
  return useAccount(roomId, parentId)
}

export function useCreateParent (roomId) {
  return useMutation(
    async (parent) => {
      return await createAccount(roomId, { type: ACCOUNT_TYPE.PARENT, ...parent })
    }
  )
}

export function useUpdateParent (roomId, parentId) {
  return useMutation(
    async (parent) => await updateAccount(roomId, parentId, parent)
  )
}

export function useDeleteParent (roomId, parentId) {
  return useMutation(
    async () => await deleteAccount(roomId, parentId)
  )
}
