import { useMemo } from "react"
import { db } from "../mocks/db";
import { useRoom } from "./rooms";

import { useStudent } from "./students";

export function useSubject(subjectId) {
  const subject = useMemo(() => db.subject.findFirst({ where: {id: {equals: subjectId}}}), [subjectId])
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
