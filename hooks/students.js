import { useMemo } from "react";
import { db } from "../mocks/db";

import { useRoom } from "./rooms";

export function useStudent (studentId) {
  const student = useMemo(() => db.student.findFirst({ where: { id: { equals: studentId }} }), [studentId])
  return student
}

export function useStudentsByRoomId (roomId) {
  const room = useRoom(roomId)
  const students = useMemo(() => room?.students || null, [room])
  return students
}
