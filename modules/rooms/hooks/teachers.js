import useSWR from 'swr'
import { useMemo } from 'react'

import { ACCOUNT_TYPE } from '@rooms/constants'
import { createAccount, getTeacherAccounts } from '@/services/api/rooms/accounts'
import { useMutation, expandSWR } from '@/hooks/api'

import { useAccountQuery, useDeleteAccountMutation, useUpdateAccountMutation } from '@rooms/hooks/accounts'

export function useTeachersQuery(roomId) {
  const swr = useSWR([roomId, 'teachers', 'as-objects'], getTeacherAccounts)
  return expandSWR(swr)
}

export function useTeacherQuery(roomId, teacherId) {
  return useAccountQuery(roomId, teacherId)
}

export function useCreateTeacherMutation (roomId) {
  return useMutation(
    async (teacher) => await createAccount(roomId, { type: ACCOUNT_TYPE.TEACHER, ...teacher })
  )
}

export function useUpdateTeacherMutation (roomId, teacherId) {
  return useUpdateAccountMutation(roomId, teacherId)
}

export function useDeleteTeacherMutation (roomId, teacherId) {
  return useDeleteAccountMutation(roomId, teacherId)
}

export function useTeacherOptions (teachers) {
  return useMemo(() => teachers?.map(({ id: value, name:label }) => ({ label, value })) || [], [teachers])
}
