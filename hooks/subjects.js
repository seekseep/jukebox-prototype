import { useMemo } from 'react'
import * as Yup from 'yup'

import {
  createSubject,
  updateSubject,
  deleteSubject,
} from '../services/api/subjects'
import { getTeacherRef } from '../services/api/teachers'
import { getStudentRef } from '../services/api/students'

import { useCollectionQuery, useDocumentQuery, useMutation } from './api'

function transformSubjectForFirestore ({ students, teachers, ...subject }) {

  if (students) {
    subject.students = students.map(studentId => getStudentRef(schoolId, roomId, studentId))
  }

  if (teachers) {
    subject.teacher = teachers.map(teacherId => getTeacherRef(schoolId, roomId, teacherId))
  }

  return subject
}

export function useSubejctSchema () {
  return useMemo(() => Yup.object().shape({
    name: Yup.string().default(''),
  }), [])
}

export function useSubjects(schoolId, roomId) {
  return useCollectionQuery(`/schools/${schoolId}/rooms/${roomId}/subjects`)
}

export function useSubject(schoolId, roomId, subjectId) {
  return useDocumentQuery(`/schools/${schoolId}/rooms/${roomId}/subjects/${subjectId}`)
}

export function useCreateSubject (schoolId, roomId) {
  return useMutation(
    async (subject) => {
      return await createSubject(schoolId, roomId, transformSubjectForFirestore(subject))
    }
  )
}

export function useUpdateSubject (schoolId, roomId, subjectId) {
  return useMutation(
    async (subject) => {
      return await updateSubject(schoolId, roomId, subjectId, transformSubjectForFirestore(subject))
    }
  )
}

export function useDeleteSubject (schoolId, roomId, subjectId) {
  return useMutation(
    async () => {
      return await deleteSubject(schoolId, roomId, subjectId)
    }
  )
}
