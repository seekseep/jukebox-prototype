import useSWR from 'swr'
import { useMemo } from 'react'

import { ACCOUNT_TYPE } from '@/constatnts'

import { useMutation, expandSWR } from '@/hooks/api'
import {
  getStudentAccounts,
  getStudentAccountRefs,
  createAccount,
} from '@/services/api/rooms/accounts'

import {
  useAccountQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation
} from '@rooms/hooks/accounts'

export function useStudentRefsQuery(roomId) {
  const swr = useSWR(roomId && [roomId, 'students'], getStudentAccountRefs)
  return expandSWR(swr)
}

export function useStudentsQuery(roomId) {
  const swr = useSWR(roomId && [roomId, 'students', 'as-objects'], getStudentAccounts)
  return expandSWR(swr)
}

export function useStudentQuery(roomId, studentId) {
  return useAccountQuery(roomId, studentId)
}

export function useCreateStudentMutation (roomId) {
  return useMutation(
    async (student) => {
      return await createAccount(roomId, { type: ACCOUNT_TYPE.STUDENT, ...student })
    }
  )
}

export function useUpdateStudentMutation (roomId, studentId) {
  return useUpdateAccountMutation(roomId, studentId)
}

export function useDeleteStudentMutation (roomId, studentId) {
  return useDeleteAccountMutation(roomId, studentId)
}

export function useStudentOptions (students) {
  return useMemo(() => students?.map(({ id: value, name:label }) => ({ label, value })) || [], [students])
}
