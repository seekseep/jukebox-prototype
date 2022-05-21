import useSWR from 'swr'
import { useMemo } from 'react'

import { ACCOUNT_TYPE } from '@/constatnts'

import {
  getStudentAccounts,
  getStudentAccountRefs,
  createAccount,
  deleteAccount,
  updateAccount
} from '@/services/api/accounts'

import { useMutation, expandSWR } from '@/hooks/api'
import { useAccount } from '@/hooks/accounts'

export function useStudentRefs(roomId) {
  const swr = useSWR([roomId, 'students'], getStudentAccountRefs)
  return expandSWR(swr)
}

export function useStudents(roomId) {
  const swr = useSWR([roomId, 'students', 'as-objects'], getStudentAccounts)
  return expandSWR(swr)
}

export function useStudent(roomId, studentId) {
  return useAccount(roomId, studentId)
}

export function useCreateStudent (roomId) {
  return useMutation(
    async (student) => {
      return await createAccount(roomId, { type: ACCOUNT_TYPE.STUDENT, ...student })
    }
  )
}

export function useUpdateStudent (roomId, studentId) {
  return useMutation(
    async (student) => await updateAccount(roomId, studentId, student)
  )
}

export function useDeleteStudent (roomId, studentId) {
  return useMutation(
    async () => await deleteAccount(roomId, studentId)
  )
}

export function useStudentOptions (students) {
  return useMemo(() => students?.map(({ id: value, name:label }) => ({ label, value })) || [], [students])
}
