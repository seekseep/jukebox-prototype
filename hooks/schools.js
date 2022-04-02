import { useMemo } from "react";
import { db } from "../mocks/db";

export function useSchool (schoolId) {
  const school = useMemo(() => db.school.findFirst({
    where: {
      id: { equals: schoolId }
    }
  }), [schoolId])
  console.log({schoolId})
  return school
}

console.log(db.school.getAll()[0])
