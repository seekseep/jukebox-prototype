import { useMemo } from "react";
import { useStudent } from "./students";
import { useTeacher } from "./teachers";

export function useScheduleRulesByStudentId (studentId) {
  const student = useStudent(studentId)
  const scheduleRules = useMemo(() => student?.scheduleRules || null, [student])
  return scheduleRules
}

export function useScheduleRulesByTeacherId (teacherId) {
  const teacher = useTeacher(teacherId)
  const scheduleRules = useMemo(() => teacher?.scheduleRules || null, [teacher])
  return scheduleRules
}
