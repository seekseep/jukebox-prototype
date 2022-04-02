import { useMemo } from "react"

import { useTeacher } from "./teachers";

export function useSubjectGroupsByTeacherId(teacherId) {
  const teacher = useTeacher(teacherId)
  const subjectGroups = useMemo(() => teacher?.subjectGroups || null, [teacher?.subjectGroups])
  return subjectGroups
}
