import { useMemo } from 'react'
import { db } from '../mocks/db'

import { useRoom } from './rooms'
import { useSubject } from './subjects'
import { useTeacher } from './teachers'

export function useSubjectGroup (subjectGroupId)  {
  const subjectGroup = useMemo(() => db.subjectGroup.findFirst({ where: { id: { equals: subjectGroupId } } }), [subjectGroupId])
  return subjectGroup
}

export function useSubjectGroupsByRoomId(roomId) {
  const room = useRoom(roomId)
  const subjectGroups = useMemo(() => room?.subjectGroups || null, [room?.subjectGroups])
  return subjectGroups
}

export function useSubjectGroupsByTeacherId(teacherId) {
  const teacher = useTeacher(teacherId)
  const subjectGroups = useMemo(() => teacher?.subjectGroups || null, [teacher?.subjectGroups])
  return subjectGroups
}

export function useSubjectGroupsBySubjectId(subjectId) {
  const subject = useSubject(subjectId)
  const subjectGroups = useMemo(() => subject?.subjectGroups || null, [subject?.subjectGroups])
  return subjectGroups
}
