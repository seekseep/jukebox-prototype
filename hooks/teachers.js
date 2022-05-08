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

export function useTeachers(roomId) {
  return useCollectionQuery(`/rooms/${roomId}/teachers`)
}

export function useTeacher(roomId, teacherId) {
  return useDocumentQuery(`/rooms/${roomId}/teachers/${teacherId}`)
}

export function useTeacherSubjects(roomId, teacherId){
  return useSWR([roomId, teacherId], getTeacherSubjects)
}

export function useTeachersByFamilyId(familyId) {
  const family = useFamily(familyId)
  const teachers = useMemo(() => family?.teachers || null, [family])
  return teachers
}

export function useCreateTeacher (roomId) {
  return useMutation(
    async (teacher) => {
      return await createTeacher(roomId, teacher)
    }
  )
}

export function useUpdateTeacher (roomId, teacherId) {
  return useMutation(
    async (teacher) => {
      return await updateTeacher(roomId, teacherId, teacher)
    }
  )
}

export function useDeleteTeacher (roomId, teacherId,) {
  return useMutation(
    async () => {
      return await deleteTeacher(roomId, teacherId)
    }
  )
}

export function useTeacherSchedules (roomId, teacherId) {
  const swr = useSWR([roomId, teacherId], getTeacherSchedules)
  return expandSWR(swr)
}

export function useTeacherRelations (roomId, teacherId) {
  const swr = useSWR([roomId, teacherId], getTeacherRelations)
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
