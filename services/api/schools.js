import { collection, doc } from 'firebase/firestore'
import { firestore } from '@/firebase'
import { createResource, deleteResource, updateResource } from './utils'

export function getSchoolsRef () {
  return collection(firestore, '/schools')
}

export function getSchoolRef (schoolId) {
  const schoolsRef = getSchoolsRef(schoolId)
  return doc(schoolsRef, schoolId)
}

export async function createSchool(data) {
  const schoolsRef = getSchoolsRef()
  return createResource(schoolsRef, data)
}

export async function updateSchool (schoolId, data) {
  const schoolRef = getSchoolRef(schoolId)
  return await updateResource(schoolRef, data)
}

export async function deleteSchool (schoolId) {
  const schoolRef = getSchoolRef(schoolId)
  return await deleteResource(schoolRef)
}
