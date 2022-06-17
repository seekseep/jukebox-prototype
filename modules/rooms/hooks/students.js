import { useMemo } from 'react'

import { useMutation } from '@/hooks/api'

import { ACCOUNT_TYPE } from '@rooms/constants'
import { createAccount, deleteAccount, updateAccounts } from '@rooms/services/api/accounts'
import {
  useAccountQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
  useAccountsQuery
} from '@rooms/hooks/accounts'
import { downloadStudentCalendars } from '@rooms/services/calendar/download/students'

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

export function useCreateStudentsMutation (roomId) {
  return useMutation(
    async (students) => {
      const createdStudents = []
      for (let student of students) {
        const createdStudent = await createAccount(roomId, { type: ACCOUNT_TYPE.STUDENT, ...student })
        createdStudents.push(createdStudent)
      }
      return createdStudents
    }
  )
}

export function useDeleteStudentsMutation (roomId) {
  return useMutation(
    async (studentIds) => {
      for (let studentId of studentIds) {
        await deleteAccount(roomId, studentId)
      }
      return null
    }
  )
}

export function useUpdateStudentMutation (roomId, studentId) {
  return useUpdateAccountMutation(roomId, studentId)
}

export function useUpdateStudentsMutation (roomId) {
  return useMutation(
    async ({ students: accounts }) => await updateAccounts(roomId, accounts)
  )
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

export function useDownlaodStudentsCalendars (roomId, resources = {})  {
  return useMutation(
    async ({ studentIds, options }) => {
      await downloadStudentCalendars(roomId, studentIds, options, resources)
    }
  )
}

export function useSchoolGradeOptions (students) {
  return useMemo(() => {
    if (!students) return []

    const options = { }
    students.forEach(student => {
      const schoolGrade = student.schoolGrade
      if (!schoolGrade) return
      options[schoolGrade] = {
        label: schoolGrade,
        value: schoolGrade
      }
    })

    return Object.values(options)
  }, [students])
}

export function useSchoolNameOptions (students) {
  return useMemo(() => {
    if (!students) return []

    const options = { }

    students.forEach(student => {
      const schoolName = student.schoolName
      if (!schoolName) return
      options[schoolName] = {
        label: schoolName,
        value: schoolName
      }
    })

    return Object.values(options)
  }, [students])
}
