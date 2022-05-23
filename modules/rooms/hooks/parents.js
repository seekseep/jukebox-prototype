import useSWR from 'swr'

import { ACCOUNT_TYPE } from '@/constatnts'

import { createAccount, getParentAccountRefs } from '@/services/api/rooms/accounts'

import { useMutation, expandSWR } from '@/hooks/api'
import { useAccountQuery, useDeleteAccountMutation, useUpdateAccountMutation } from '@rooms/hooks/accounts'

export function useParentRefsQuery(roomId) {
  const swr = useSWR(roomId && [roomId, 'parents'], getParentAccountRefs)
  return expandSWR(swr)
}

export function useParentQuery(roomId, parentId) {
  return useAccountQuery(roomId, parentId)
}

export function useCreateParentMutation (roomId) {
  return useMutation(
    async (parent) => {
      return await createAccount(roomId, { type: ACCOUNT_TYPE.PARENT, ...parent })
    }
  )
}

export function useUpdateParentMutation (roomId, parentId) {
  return useUpdateAccountMutation(roomId, parentId)
}

export function useDeleteParentMutation (roomId, parentId) {
  return useDeleteAccountMutation(roomId, parentId)
}
