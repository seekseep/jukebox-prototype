import useSWR from 'swr'
import { useMemo } from 'react'

import { ACCOUNT_TYPE } from '@rooms/constants'
import { createAccount, getTeacherAccounts, deleteAccount, updateAccounts } from '@rooms/services/api/accounts'
import { useMutation, expandSWR } from '@/hooks/api'

import { useAccountQuery, useDeleteAccountMutation, useUpdateAccountMutation } from '@rooms/hooks/accounts'
import {
  downloadTeacherCalendars,
  downloadTeacherCalendar
} from '@rooms/services/calendar/download/teachers'

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

export function useCreateTeachersMutation (roomId) {
  return useMutation(
    async (teachers) => {
      const createdTeachers = []
      for (let teacher of teachers) {
        const createdTeacher = await createAccount(roomId, { type: ACCOUNT_TYPE.TEACHER, ...teacher })
        createdTeachers.push(createdTeacher)
      }
      return createdTeachers
    }
  )
}

export function useUpdateTeacherMutation (roomId, teacherId) {
  return useUpdateAccountMutation(roomId, teacherId)
}

export function useUpdateTeachersMutation (roomId) {
  return useMutation(
    async ({ teachers: accounts }) => await updateAccounts(roomId, accounts)
  )
}

export function useDeleteTeacherMutation (roomId, teacherId) {
  return useDeleteAccountMutation(roomId, teacherId)
}

export function useDeleteTeachersMutation (roomId) {
  return useMutation(
    async (teacherIds) => {
      for (let teacherId of teacherIds) {
        await deleteAccount(roomId, teacherId)
      }
      return null
    }
  )
}

export function useTeacherOptions (teachers) {
  return useMemo(() => teachers?.map(({ id: value, name:label }) => ({ label, value })) || [], [teachers])
}

export function useDownlaodTeacherCalendars (roomId, resources = {})  {
  return useMutation(
    async ({ teacherIds, options }) => {
      await downloadTeacherCalendars(roomId, teacherIds, options, resources)
    }
  )
}

export function useDownlaodTeacherCalendar (roomId, resources = {})  {
  return useMutation(
    async ({ teacherId, options }) => {
      await downloadTeacherCalendar(roomId, teacherId, options, resources)
    }
  )
}
