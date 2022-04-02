import { useMemo } from "react";
import { db } from "../mocks/db";

export function useSchool (schoolId) {
  const school = useMemo(() => db.school.findFirst({
    where: {
      id: { equals: schoolId }
    }
  }), [schoolId])
  return school
}
