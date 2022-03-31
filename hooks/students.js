import { useMemo } from "react";
import { db } from "../mocks/db";

export function useStudent (studentId) {
  const student = useMemo(() => db.student.findFirst({ id: studentId  }), [studentId])

  return student;
}

export function useStudentsByRoomId (roomId) {
  const students = useMemo(() => {
    if (!roomId) return null

    return db.student.findMany({
      query: {
        where: {
          roomId: {
            equals: roomId
          }
        }
      }
    })

  }, [])

  return students
}
