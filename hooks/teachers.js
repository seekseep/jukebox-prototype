import useSWR from 'swr'

import { useMemo } from 'react'
import * as Yup from 'yup'

import {
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherSubjects,
  getTeacherRelations,
  getTeacherSchedules
} from '../services/api/teachers'

import { useDocumentQuery, useCollectionQuery, useMutation, expandSWR } from './api'

import { useFamily } from './families'

export function useTeacherSchema () {
  return useMemo(() => Yup.object().shape({
    name: Yup.string().required().default('')
  }),[])
}

export function useTeachers(schoolId, roomId) {
  return useCollectionQuery(`/schools/${schoolId}/rooms/${roomId}/teachers`)
}

export function useTeacher(schoolId, roomId, teacherId) {
  return useDocumentQuery(`/schools/${schoolId}/rooms/${roomId}/teachers/${teacherId}`)
}

export function useTeacherSubjects(schoolId, roomId, teacherId){
  return useSWR([schoolId, roomId, teacherId], getTeacherSubjects)
}

export function useTeachersByFamilyId(familyId) {
  const family = useFamily(familyId)
  const teachers = useMemo(() => family?.teachers || null, [family])
  return teachers
}

export function useCreateTeacher (schoolId, roomId) {
  return useMutation(
    async (teacher) => {
      return await createTeacher(schoolId, roomId, teacher)
    }
  )
}

export function useUpdateTeacher (schoolId, roomId, teacherId) {
  return useMutation(
    async (teacher) => {
      return await updateTeacher(schoolId, roomId, teacherId, teacher)
    }
  )
}

export function useDeleteTeacher (schoolId, roomId, teacherId,) {
  return useMutation(
    async () => {
      return await deleteTeacher(schoolId, roomId, teacherId)
    }
  )
}

export function useTeacherSchedules (schoolId, roomId, teacherId) {
  const swr = useSWR([schoolId, roomId, teacherId], getTeacherSchedules)
  return expandSWR(swr)
}

export function useTeacherRelations (schoolId, roomId, teacherId) {
  const swr = useSWR([schoolId, roomId, teacherId], getTeacherRelations)
  return expandSWR(swr)
}

export function useTeacherOptions (teachers) {
  return useMemo(() =>
    teachers?.map(teacher => ({
      value: teacher.id,
      label: teacher.name
    })) || []
  ,[teachers])
}
