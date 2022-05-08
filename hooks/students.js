import useSWR from 'swr'

import { useMemo } from 'react'
import * as Yup from 'yup'

import {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentSubjects,
  getStudentSchedules,
  getStudentRelations
} from '../services/api/students'

import { useDocumentQuery, useCollectionQuery, useMutation, expandSWR } from './api'

import { useFamily } from './families'
import { useRoom } from './rooms'


export function useStudentSchema () {
  return useMemo(() => Yup.object().shape({
    name: Yup.string().required().default(''),
  }),[])
}

export function useStudentsByRoomId (roomId) {
  const room = useRoom(roomId)
  const students = useMemo(() => room?.students || null, [room])
  return students
}

export function useStudents(roomId) {
  return useCollectionQuery(`/rooms/${roomId}/students`)
}

export function useStudent(roomId, studentId) {
  return useDocumentQuery(`/rooms/${roomId}/students/${studentId}`)
}

export function useStudentsByFamilyId(familyId) {
  const family = useFamily(familyId)
  const students = useMemo(() => family?.students || null, [family])
  return students
}

export function useCreateStudent (roomId) {
  return useMutation(
    async (student) => {
      return await createStudent(roomId, student)
    }
  )
}

export function useUpdateStudent (roomId, studentId) {
  return useMutation(
    async (student) => {
      return await updateStudent(roomId, studentId, student)
    }
  )
}

export function useDeleteStudent (roomId, studentId) {
  return useMutation(
    async () => {
      return await deleteStudent(roomId, studentId)
    }
  )
}

export function useStudentSubjects (roomId, studentId) {
  const swr = useSWR([roomId, studentId], getStudentSubjects)
  return expandSWR(swr)
}

export function useStudentSchedules (roomId, studentId) {
  const swr = useSWR([roomId, studentId], getStudentSchedules)
  return expandSWR(swr)
}

export function useStudentRelations (roomId, studentId) {
  const swr = useSWR([roomId, studentId], getStudentRelations)
  return expandSWR(swr)
}

export function useStudentOptions (students) {
  return useMemo(() =>
    students?.map(student => ({
      value: student.id,
      label: student.name
    })) || []
  ,[students])
}
