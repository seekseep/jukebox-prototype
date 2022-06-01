import { useMemo } from 'react'

import { ACCOUNT_TYPE } from '@rooms/constants'

import { useMutation } from '@/hooks/api'
import { createAccount } from '@/services/api/rooms/accounts'

import {
  useAccountQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
  useAccountsQuery
} from '@rooms/hooks/accounts'

export function useStudentsQuery(roomId) {
  const { data: accounts , ...result } = useAccountsQuery(roomId)

  const students = useMemo(() => {
    if (!accounts) return accounts
    return accounts.filter(account => account.type === ACCOUNT_TYPE.STUDENT)
  }, [accounts])

  return { data: students, ...result }
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
  return useMemo(() => students?.map(({ id: value, name, nameKana }) => {

    const label = `${name}${nameKana ? `(${nameKana})` : ''}`

    return ({ label, value })
  }) || [], [students])
}
