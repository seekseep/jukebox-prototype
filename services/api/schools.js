import {
  getFirestore,
  collection, doc,
} from 'firebase/firestore'

import { app } from '../../firebase'

import { createResource, deleteResource, updateResource } from './utils'

export function getSchoolsRef () {
  const firestore = getFirestore(app)
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

export async function updateSchool (schoolId, data, { marge = true } = { }) {
  const schoolRef = getSchoolRef(schoolId)
  return await updateResource(schoolRef, data, { marge })
}

export async function deleteSchool (schoolId) {
  const schoolRef = getSchoolRef(schoolId)
  return await deleteResource(schoolRef)
}
