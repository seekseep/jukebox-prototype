import useSWR from 'swr'

import { ACCOUNT_TYPE } from '@rooms/constants'

import { createAccount, updateAccount } from '@/services/api/rooms/accounts'

import { useMutation } from '@/hooks/api'
import { useAccountQuery, useDeleteAccountMutation, useAccountsByAccountTypeQuery } from '@rooms/hooks/accounts'
import { getStudentRef } from '@/services/api/rooms/students'

export function useParentsQuery(roomId) {
  return useAccountsByAccountTypeQuery(roomId, ACCOUNT_TYPE.PARENT)
}

export function useParentQuery(roomId, parentId) {
  return useAccountQuery(roomId, parentId)
}

export function useCreateParentMutation (roomId) {
  return useMutation(
    async (parent) =>
      await createAccount(roomId, {
        ...parent,
        type    : ACCOUNT_TYPE.PARENT,
        students: parent.students.map(studentId => getStudentRef(roomId, studentId))
      })
  )
}

export function useUpdateParentMutation (roomId, parentId) {
  return useMutation(
    async (parent) =>
     await updateAccount(roomId, parentId, {
       ...parent,
       students: parent.students.map(studentId => getStudentRef(roomId, studentId))
     })
  )
}

export function useDeleteParentMutation (roomId, parentId) {
  return useDeleteAccountMutation(roomId, parentId)
}
