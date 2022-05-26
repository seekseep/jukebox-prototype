import { useMemo } from 'react'
import {
  useCollectionAsObjectArrayQuery,
  useDocAsObjectQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation
} from '@/hooks/api'

import { ACCOUNT_TYPE } from '@rooms/constants'
import { useCurrentAccount } from '@rooms/hooks/accounts'

export function useRoomRefsQuery() {
  return useCollectionAsObjectArrayQuery('/rooms')
}

export function useRoomQuery(roomId) {
  return useDocAsObjectQuery(`/rooms/${roomId}`)
}

export function useCreateRoomMutation () {
  return useCreateDocMutation('/rooms')
}

export function useUpdateRoomMutation (roomId) {
  return useUpdateDocMutation(roomId && `/rooms/${roomId}`)
}

export function useDeleteRoomMutation (roomId) {
  return useDeleteDocMutation(roomId && `/rooms/${roomId}`)
}

export function useActiveFeatures(roomId) {
  const { data: account, ...result }  = useCurrentAccount(roomId)
  const activeFeatures = useMemo(() => {
    const type = account?.type
    const isParent = type === ACCOUNT_TYPE.PARENT
    const isStudent = type === ACCOUNT_TYPE.STUDENT
    const isCustomer = isParent || isStudent
    const isTeacher = type === ACCOUNT_TYPE.TEACHER
    const isStaff = isTeacher
    const isAccount = isStaff || isCustomer
    return {
      students: isAccount,
      teachers: isStaff,
      sheets  : isStaff,
      subjects: isAccount,
      lessons : isAccount,
      parents : isStaff,
      settings: isStaff,
    }
  }, [account?.type])

  return { data: activeFeatures, ...result }
}
