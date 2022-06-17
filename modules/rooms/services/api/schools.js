import { firestore } from '@/firebase'

export function getSchoolsRef () {
  return collection(firestore, '/schools')
}

export function getSchoolRef (schoolId) {
  const schoolsRef = getSchoolsRef(schoolId)
  return doc(schoolsRef, schoolId)
}
