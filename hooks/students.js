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

export function useStudents(schoolId, roomId) {
  return useCollectionQuery(`/schools/${schoolId}/rooms/${roomId}/students`)
}

export function useStudent(schoolId, roomId, studentId) {
  return useDocumentQuery(`/schools/${schoolId}/rooms/${roomId}/students/${studentId}`)
}

export function useStudentsByFamilyId(familyId) {
  const family = useFamily(familyId)
  const students = useMemo(() => family?.students || null, [family])
  return students
}

export function useCreateStudent (schoolId, roomId) {
  return useMutation(
    async (student) => {
      return await createStudent(schoolId, roomId, student)
    }
  )
}

export function useUpdateStudent (schoolId, roomId, studentId) {
  return useMutation(
    async (student) => {
      return await updateStudent(schoolId, roomId, studentId, student)
    }
  )
}

export function useDeleteStudent (schoolId, roomId, studentId) {
  return useMutation(
    async () => {
      return await deleteStudent(schoolId, roomId, studentId)
    }
  )
}

export function useStudentSubjects (schoolId, roomId, studentId) {
  const swr = useSWR([schoolId, roomId, studentId], getStudentSubjects)
  return expandSWR(swr)
}

export function useStudentSchedules (schoolId, roomId, studentId) {
  const swr = useSWR([schoolId, roomId, studentId], getStudentSchedules)
  return expandSWR(swr)
}

export function useStudentRelations (schoolId, roomId, studentId) {
  const swr = useSWR([schoolId, roomId, studentId], getStudentRelations)
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
