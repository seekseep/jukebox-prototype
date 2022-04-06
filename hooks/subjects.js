import { useMemo } from 'react'
import { db } from '../mocks/db'
import { useRoom } from './rooms'

import { useStudent } from './students'

export function useSubject(subjectId) {
  const subject = useMemo(() => db.subject.findFirst({ where: { id: { equals: subjectId } } }), [subjectId])
  return subject
}

export function useSubjectsByStudentId(studentId) {
  const student = useStudent(studentId)
  const subjects = useMemo(() => student?.subjects || null, [student])
  return subjects
}

export function useSubjectsByRoomId (roomId) {
  const room = useRoom(roomId)
  const subjects = useMemo(() => room?.subjects || null, [room])
  return subjects
}

export function useSubjectTagsByRoomId(roomId) {
  const subjects = useSubjectsByRoomId(roomId)

  const subjectTags = useMemo(() => {
    if (!subjects) return []

    return Object.keys(
      subjects.reduce((allTags, subject) =>
        subject.tags.reduce((tags, tag) => ({
          ...tags,
          [tag]: true
        }), allTags)
      , [])
    )
  }, [subjects])

  return subjectTags
}

export function useSubjectsByRoomIdAndSubjectTagName (roomId, subjectTagName) {
  const subjects = useSubjectsByRoomId(roomId)

  const filteredSubjects = useMemo(() => {
    if (!subjects) return []

    return subjects.filter(subject => subject.tags.includes(subjectTagName))
  }, [subjectTagName, subjects])

  return filteredSubjects
}
