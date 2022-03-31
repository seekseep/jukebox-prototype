import { useMemo } from "react";
import { db } from "../mocks/db";

export function useSchool (schoolId) {
  const school = useMemo(() => db.school.findFirst({ id: schoolId }), [schoolId])

  return school
}
