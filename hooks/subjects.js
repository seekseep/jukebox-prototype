import useSWR from 'swr'
import { useMemo } from 'react'
import * as Yup from 'yup'

import {
  createSubject,
  updateSubject,
  deleteSubject,
} from '@/services/api/subjects'
import { getSubjectLessons } from '@/services/api/lessons'
import { getTeacherRef } from '@/services/api/teachers'
import { getStudentRef } from '@/services/api/students'

import { expandSWR, useCollectionQuery, useDocumentQuery, useMutation } from './api'

function transformSubjectForFirestore ({ students, teachers, ...subject }) {

  if (students) {
    subject.students = students.map(studentId => getStudentRef(roomId, studentId))
  }

  if (teachers) {
    subject.teacher = teachers.map(teacherId => getTeacherRef(roomId, teacherId))
  }

  return subject
}

export function useSubejctSchema () {
  return useMemo(() => Yup.object().shape({
    name: Yup.string().default(''),
  }), [])
}

export function useSubjects(roomId) {
  return useCollectionQuery(`/rooms/${roomId}/subjects`)
}

export function useSubject(roomId, subjectId) {
  return useDocumentQuery(`/rooms/${roomId}/subjects/${subjectId}`)
}

export function useSubjectLessons(roomId, subjectId) {
  const swr = useSWR([roomId, subjectId, 'lessons'], getSubjectLessons)
  return expandSWR(swr)
}

export function useCreateSubject (roomId) {
  return useMutation(
    async (subject) => {
      return await createSubject(roomId, transformSubjectForFirestore(subject))
    }
  )
}

export function useUpdateSubject (roomId, subjectId) {
  return useMutation(
    async (subject) => {
      return await updateSubject(roomId, subjectId, transformSubjectForFirestore(subject))
    }
  )
}

export function useDeleteSubject (roomId, subjectId) {
  return useMutation(
    async () => {
      return await deleteSubject(roomId, subjectId)
    }
  )
}
