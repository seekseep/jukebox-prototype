import useSWR from 'swr'
import { useMemo } from 'react'

import { ACCOUNT_TYPE } from '@/constatnts'

import { createAccount, deleteAccount, updateAccount, getTeacherAccountRefs, getTeacherAccounts } from '@/services/api/accounts'

import { useMutation, expandSWR } from '@/hooks/api'
import { useAccount } from '@/hooks/accounts'

export function useTeachers(roomId) {
  const swr = useSWR([roomId, 'teachers', 'as-objects'], getTeacherAccounts)
  return expandSWR(swr)
}

export function useTeacherRefs(roomId) {
  const swr = useSWR([roomId, 'teachers'], getTeacherAccountRefs)
  return expandSWR(swr)
}

export function useTeacher(roomId, teacherId) {
  return useAccount(roomId, teacherId)
}

export function useCreateTeacher (roomId) {
  return useMutation(
    async (teacher) => await createAccount(roomId, { type: ACCOUNT_TYPE.TEACHER, ...teacher })
  )
}

export function useUpdateTeacher (roomId, teacherId) {
  return useMutation(
    async (teacher) => await updateAccount(roomId, teacherId, teacher)
  )
}

export function useDeleteTeacher (roomId, teacherId) {
  return useMutation(
    async () => await deleteAccount(roomId, teacherId)
  )
}

export function useTeacherOptions (teachers) {
  return useMemo(() => teachers?.map(({ id: value, name:label }) => ({ label, value })) || [], [teachers])
}
