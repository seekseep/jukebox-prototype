import {
  getFirestore,
  collection, doc,
  getDoc, addDoc, updateDoc, deleteDoc
} from 'firebase/firestore'

import { app } from '../../firebase'

import { docSnapshotToData } from './utils'

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

  const schoolRef = await addDoc(schoolsRef, data)

  const schooolSnapshot = await getDoc(schoolRef)
  const createdSchool = docSnapshotToData(schooolSnapshot)

  return createdSchool
}

export async function updateSchool (schoolId, data, { merge = true } = { }) {
  const schoolRef = getSchoolRef(schoolId)

  await updateDoc(schoolRef, data, { merge })

  const schooolSnapshot = await getDoc(schoolRef)
  const updatedSchool = docSnapshotToData(schooolSnapshot)

  return updatedSchool
}

export async function deleteSchool (schoolId) {
  const schoolRef = getSchoolRef(schoolId)

  await deleteDoc(schoolRef)

  return null
}
