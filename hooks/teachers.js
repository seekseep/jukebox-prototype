import useSWR from 'swr'

import { useMemo } from 'react'
import * as Yup from 'yup'

import {
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherSubjects,
  createTeacherSchedule,
  updateTeacherSchedule,
  deleteTeacherSchedule,
  createTeacherRelation,
  updateTeacherRelation,
  deleteTeacherRelation
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

export function useTeacherOptions (teachers) {
  return useMemo(() =>
    teachers?.map(teacher => ({
      value: teacher.id,
      label: teacher.name
    })) || []
  ,[teachers])
}

export function useTeacherSchedules (roomId, teacherId) {
  return useCollectionQuery(`/rooms/${roomId}/teachers/${teacherId}/schedules`)
}

export function useTeacherSchedule (roomId, teacherId, scheduleId) {
  return useDocumentQuery(`/rooms/${roomId}/teachers/${teacherId}/schedules/${scheduleId}`)
}

export function useCreateTeacherSchedule (roomId, teacherId) {
    return useMutation(
    async (schedule) => {
      return await createTeacherSchedule(roomId, teacherId, schedule)
    }
  )
}

export function useUpdateTeacherSchedule (roomId, teacherId, scheduleId) {
  return useMutation(
    async (schedule) => {
      return await updateTeacherSchedule(roomId, teacherId, scheduleId, schedule)
    }
  )
}

export function useDeleteTeacherSchedule (roomId, teacherId, scheduleId) {
  return useMutation(
    async () => {
      return await deleteTeacherSchedule(roomId, teacherId, scheduleId)
    }
  )
}

export function useTeacherRelations (roomId, teacherId) {
  return useCollectionQuery(`/rooms/${roomId}/teachers/${teacherId}/relations`)
}

export function useTeacherRelation (roomId, teacherId, relationId) {
  return useDocumentQuery(`/rooms/${roomId}/teachers/${teacherId}/relations/${relationId}`)
}

export function useCreateTeacherRelation (roomId, teacherId) {
    return useMutation(
    async (relation) => {
      return await createTeacherRelation(roomId, teacherId, relation)
    }
  )
}

export function useUpdateTeacherRelation (roomId, teacherId, relationId) {
  return useMutation(
    async (relation) => {
      return await updateTeacherRelation(roomId, teacherId, relationId, relation)
    }
  )
}

export function useDeleteTeacherRelation (roomId, teacherId, relationId) {
  return useMutation(
    async () => {
      return await deleteTeacherRelation(roomId, teacherId, relationId)
    }
  )
}
