import useSWR from 'swr'
import { useMemo } from 'react'

import {
  getTeacherSubjectRefs,
  getStudentSubjectRefs
} from '@/services/api/rooms/subjects'

import {
  useCollectioDocRefsQuery,
  useDocAsObjectQuery,
  useCollectionAsObjectArrayQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation,
  expandSWR,
  useUnionExpandedSWR,
} from '@/hooks/api'

import { useLessonsQuery } from '@rooms/hooks/lessons'


export function useSubjectRefsQuery(roomId) {
  return useCollectioDocRefsQuery(roomId && `/rooms/${roomId}/subjects`)
}

export function useSubjectsQuery(roomId) {
  return useCollectionAsObjectArrayQuery(roomId && `/rooms/${roomId}/subjects`)
}

export function useSubjectQuery(roomId, subjectId) {
  return useDocAsObjectQuery(roomId && subjectId && `/rooms/${roomId}/subjects/${subjectId}`)
}

export function useCreateSubjectMutation (roomId) {
  return useCreateDocMutation(roomId && `/rooms/${roomId}/subjects`)
}

export function useUpdateSubjectMutation (roomId, subjectId) {
  return useUpdateDocMutation(roomId && subjectId && `/rooms/${roomId}/subjects/${subjectId}`)
}

export function useDeleteSubjectMutation (roomId, subjectId) {
  return useDeleteDocMutation(roomId && subjectId && `/rooms/${roomId}/subjects/${subjectId}`)
}

export function useStudentSubjectRefsQuery(roomId, studentId) {
  const swr = useSWR(roomId && studentId && [roomId, studentId, 'subjects'], getStudentSubjectRefs)
  return expandSWR(swr)
}

export function useTeacherSubjectRefsQuery(roomId, teacherId) {
  const swr = useSWR(roomId && teacherId && [roomId, teacherId, 'subjects'], getTeacherSubjectRefs)
  return expandSWR(swr)
}

export function useSubjectOptions (subjects) {
  return useMemo(() => subjects?.map(({ id: value, name:label }) => ({ label, value })) || [], [subjects])
}

export function useStudentSubjectsQuery (roomId, studentId) {
  const lessonsResult = useLessonsQuery(roomId)
  const subjectsResult = useSubjectsQuery(roomId)

  const result = useUnionExpandedSWR(lessonsResult, subjectsResult)

  const studentSubjects = useMemo(() => {
    const lessons = lessonsResult?.data
    const subjects = subjectsResult?.data
    if (!lessons || !subjects) return null

    const subjectsMap = new Map()
    subjects.forEach(subject => {
      subjectsMap.set(subject.id, subject)
    })

    const studentSubjects = Object.values(
      lessons.reduce((studentSubjects, lesson) => {
        const subjectId = lesson.subject.id
        if (!subjectId || !!studentSubjects[subjectId]) return studentSubjects

        const isStudentLesson = lesson.students.some(student => {
          return student.id === studentId
        })
        if (!isStudentLesson) return studentSubjects

        const subject = subjectsMap.get(subjectId)
        console.log(subject)
        return {
          ...studentSubjects,
          [subjectId]: subject
        }
      }, {})
    )
    return studentSubjects
  }, [studentId, lessonsResult?.data, subjectsResult?.data])

  return {
    ...result,
    data: studentSubjects
  }
}
