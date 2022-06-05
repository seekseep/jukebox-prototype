import { useMemo } from 'react'

import {
  useDocAsObjectQuery,
  useCollectionAsObjectArrayQuery,
  useCreateDocMutation,
  useUpdateDocMutation,
  useDeleteDocMutation,
  useUnionExpandedSWR,
} from '@/hooks/api'

import { useLessonsQuery } from '@rooms/hooks/lessons'

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

export function useSubjectOptions (subjects) {
  return useMemo(() => subjects?.map(({ id: value, name:label }) => ({ label, value })) || [], [subjects])
}

function createSubjectsMap (subjects) {
  const subjectsMap = new Map()
  subjects.forEach(subject => {
    subjectsMap.set(subject.id, subject)
  })
  return subjectsMap
}

export function useStudentSubjectsQuery (roomId, studentId) {
  const lessonsResult = useLessonsQuery(roomId)
  const subjectsResult = useSubjectsQuery(roomId)

  const result = useUnionExpandedSWR(lessonsResult, subjectsResult)

  const studentSubjects = useMemo(() => {
    const lessons = lessonsResult?.data
    const subjects = subjectsResult?.data
    if (!lessons || !subjects) return null

    const subjectsMap = createSubjectsMap(subjects)
    const studentSubjects = Object.values(
      lessons.reduce((studentSubjects, lesson) => {
        const subjectId = lesson.subject.id
        if (!subjectId || !!studentSubjects[subjectId]) return studentSubjects
        const isStudentLesson = lesson.students.some(student => {
          return student.id === studentId
        })
        if (!isStudentLesson) return studentSubjects
        const subject = subjectsMap.get(subjectId)
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

export function useTeacherSubjectsQuery (roomId, teacherId) {
  const lessonsResult = useLessonsQuery(roomId)
  const subjectsResult = useSubjectsQuery(roomId)

  const result = useUnionExpandedSWR(lessonsResult, subjectsResult)

  const teacherSubjects = useMemo(() => {
    const lessons = lessonsResult?.data
    const subjects = subjectsResult?.data
    if (!lessons || !subjects) return null

    const subjectsMap = createSubjectsMap(subjects)
    const teacherSubjects = Object.values(
      lessons.reduce((teacherSubjects, lesson) => {
        const subjectId = lesson.subject.id
        if (!subjectId || !!teacherSubjects[subjectId]) return teacherSubjects
        const isTeacherLesson = lesson.teachers.some(teacher => {
          return teacher.id === teacherId
        })
        if (!isTeacherLesson) return teacherSubjects
        const subject = subjectsMap.get(subjectId)
        return {
          ...teacherSubjects,
          [subjectId]: subject
        }
      }, {})
    )
    return teacherSubjects
  }, [teacherId, lessonsResult?.data, subjectsResult?.data])

  return {
    ...result,
    data: teacherSubjects
  }
}
