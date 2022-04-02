import { useMemo } from "react"

import { useStudent } from "./students";

export function useSubjectsByStudentId(studentId) {
  const student = useStudent(studentId)
  const subjects = useMemo(() => student?.subjects || null, [student])
  return subjects
}
