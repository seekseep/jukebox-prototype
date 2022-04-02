import { useMemo } from "react";
import { useStudent } from "./students";

export function useScheduleRulesByStudentId (studentId) {
  const student = useStudent(studentId)
  const scheduleRules = useMemo(() => student?.scheduleRules || null, [student])
  return scheduleRules
}
