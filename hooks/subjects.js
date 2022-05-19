import {
  useMutation,
  useCollectioDocRefsQuery,
  useDocAsObjectQuery,
  useCollectionAsObjectArrayQuery,
  expandSWR } from '@/hooks/api'
import {
  getTeacherSubjectRefs,
  createSubject, updateSubject, deleteSubject, getStudentSubjectRefs
} from '@/services/api/subjects'
import useSWR from 'swr'

export function useSubjectRefs(roomId) {
  return useCollectioDocRefsQuery(`/rooms/${roomId}/subjects`)
}

export function useSubjects(roomId) {
  return useCollectionAsObjectArrayQuery(`/rooms/${roomId}/subjects`)
}

export function useSubject(roomId, subjectId) {
  return useDocAsObjectQuery(`/rooms/${roomId}/subjects/${subjectId}`)
}

export function useStudentSubjectRefs(roomId, studentId) {
  const swr = useSWR([roomId, studentId, 'subjects'], getStudentSubjectRefs)
  return expandSWR(swr)
}

export function useTeacherSubjectRefs(roomId, teacherId) {
  const swr = useSWR([roomId, teacherId, 'subjects'], getTeacherSubjectRefs)
  return expandSWR(swr)
}

export function useCreateSubject (roomId) {
  return useMutation(
    async (subject) => await createSubject(roomId, subject)
  )
}

export function useUpdateSubject (roomId, subjectId) {
  return useMutation(
    async (subject) => await updateSubject(roomId, subjectId, subject)
  )
}

export function useDeleteSubject (roomId, subjectId) {
  return useMutation(
    async () => await deleteSubject(roomId, subjectId)
  )
}

export function useSubjectOptions (subjects) {
  return useMemo(() => subjects?.map(({ id: value, name:label }) => ({ label, value })) || [], [subjects])
}
